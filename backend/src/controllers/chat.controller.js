/**
 * Heritage Pulse - Chat Controller
 * =================================
 * Business logic for AI chat interactions.
 */

const chatService = require('../services/chat.service');
const openRouterService = require('../services/openrouter.service');
const logger = require('../utils/logger');
const { ApiError } = require('../middleware/errorHandler');

// In-memory chat history storage (replace with database in production)
const chatHistories = new Map();

/**
 * Send a message and get AI response
 */
const sendMessage = async (req, res, next) => {
    try {
        const { message, conversationId } = req.body;

        // Get or create conversation history
        const convId = conversationId || `conv_${Date.now()}`;

        if (!chatHistories.has(convId)) {
            chatHistories.set(convId, []);
        }

        const history = chatHistories.get(convId);

        // Add user message to history
        history.push({ role: 'user', content: message });

        // Get AI response
        const response = await openRouterService.chat({
            messages: history,
            context: await chatService.getHeritageContext(message),
        });

        // Add assistant response to history
        history.push({ role: 'assistant', content: response.content });

        // Limit history to last 20 messages
        if (history.length > 20) {
            history.splice(0, history.length - 20);
        }

        res.json({
            success: true,
            data: {
                conversationId: convId,
                message: response.content,
                timestamp: new Date().toISOString(),
            },
        });
    } catch (error) {
        logger.error('Error in chat:', error);
        next(error);
    }
};

/**
 * Send a message and get streaming AI response (SSE)
 */
const streamMessage = async (req, res, next) => {
    try {
        const { message, conversationId } = req.body;

        // Set up SSE headers
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');

        // Get or create conversation history
        const convId = conversationId || `conv_${Date.now()}`;

        if (!chatHistories.has(convId)) {
            chatHistories.set(convId, []);
        }

        const history = chatHistories.get(convId);
        history.push({ role: 'user', content: message });

        // Send conversation ID
        res.write(`data: ${JSON.stringify({ type: 'start', conversationId: convId })}\n\n`);

        // Stream AI response
        let fullContent = '';

        await openRouterService.streamChat({
            messages: history,
            context: await chatService.getHeritageContext(message),
            onChunk: (chunk) => {
                fullContent += chunk;
                res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}\n\n`);
            },
            onComplete: () => {
                // Add complete response to history
                history.push({ role: 'assistant', content: fullContent });

                // Limit history
                if (history.length > 20) {
                    history.splice(0, history.length - 20);
                }

                res.write(`data: ${JSON.stringify({ type: 'end' })}\n\n`);
                res.end();
            },
            onError: (error) => {
                logger.error('Streaming error:', error);
                res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
                res.end();
            },
        });
    } catch (error) {
        logger.error('Error in stream chat:', error);
        res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
        res.end();
    }
};

/**
 * Get chat history for a conversation
 */
const getChatHistory = async (req, res, next) => {
    try {
        const { conversationId } = req.params;

        const history = chatHistories.get(conversationId) || [];

        res.json({
            success: true,
            data: {
                conversationId,
                messages: history,
                messageCount: history.length,
            },
        });
    } catch (error) {
        logger.error('Error fetching chat history:', error);
        next(error);
    }
};

/**
 * Clear chat history for a conversation
 */
const clearChatHistory = async (req, res, next) => {
    try {
        const { conversationId } = req.params;

        if (chatHistories.has(conversationId)) {
            chatHistories.delete(conversationId);
        }

        res.json({
            success: true,
            message: 'Chat history cleared successfully',
        });
    } catch (error) {
        logger.error('Error clearing chat history:', error);
        next(error);
    }
};

module.exports = {
    sendMessage,
    streamMessage,
    getChatHistory,
    clearChatHistory,
};
