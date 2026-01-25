/**
 * Heritage Pulse - Chat Controller
 * =================================
 * Business logic for AI chat interactions.
 */

const chatService = require('../services/chat.service');
const openRouterService = require('../services/openrouter.service');
const {
    wikidataService,
    wikipediaService,
    openStreetMapService
} = require('../services');
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

/**
 * Heritage Assistant Chat Handler
 * ===============================
 * Handles questions about heritage sites, history, and travel advice.
 */
const heritageAssistant = async (req, res, next) => {
    try {
        const { message, context = {} } = req.body;
        const { current_location } = context;

        logger.info(`Heritage Assistant Query: ${message}`);

        // ===========================================
        // Step 1: Intent & Keyword Extraction
        // ===========================================
        const keywords = chatService.extractKeywords(message);
        let relevantData = null;
        let sources = [];

        // ===========================================
        // Step 2: Data Retrieval
        // ===========================================

        // Scenario A: Asking about a specific place (via keywords)
        if (keywords.length > 0) {
            // Pick the longest keyword assuming it's the specific site name (heuristic)
            const siteName = keywords.sort((a, b) => b.length - a.length)[0];

            // Try Wikipedia first for quick context
            const wikiData = await wikipediaService.getHistoricalContext(siteName);
            if (wikiData.found) {
                relevantData = {
                    name: wikiData.title,
                    summary: wikiData.summary,
                    details: "Fetched from Wikipedia",
                    imageUrl: wikiData.imageUrl
                };
                sources.push({ type: 'wikipedia', url: wikiData.url, title: wikiData.title });
            }

            // Try Wikidata for structured data if location known or just search
            // (Simplified: if we have a location in context, search nearby, else global search is hard without location)
        }

        // Scenario B: Asking about "nearby" or "here"
        if ((message.toLowerCase().includes('nearby') || message.toLowerCase().includes('here')) && current_location) {
            const geocoded = await openStreetMapService.geocodeLocation(current_location);
            if (geocoded) {
                const sites = await openStreetMapService.getNearbyMonuments(geocoded.lat, geocoded.lng, 2000); // 2km
                relevantData = {
                    ...relevantData,
                    nearby_sites: sites.slice(0, 5).map(s => s.name)
                };
                sources.push({ type: 'osm', title: `Nearby around ${current_location}` });
            }
        }

        // ===========================================
        // Step 3: Context Assembly
        // ===========================================
        const systemPrompt = `You are Heritage Assistant, an AI guide for Indian cultural heritage.

CAPABILITIES:
- Explain historical significance of monuments
- Provide architectural details from verified sources
- Suggest travel routes and timing
- Answer cultural questions respectfully

LIMITATIONS:
- Use only provided verified data for factual claims if available
- Admit when information is unavailable
- Do not invent historical facts

VERIFIED DATA CONTEXT: ${JSON.stringify(relevantData || 'No specific database data found, rely on general knowledge but be cautious.')}`;

        // ===========================================
        // Step 4: AI Response
        // ===========================================
        let reply = "";
        try {
            const aiResponse = await openRouterService.chat({
                messages: [{ role: 'user', content: message }],
                context: systemPrompt
            });
            reply = aiResponse.content;
        } catch (aiError) {
            logger.error('AI Service Error:', aiError.message);
            // Fallback if AI fails (e.g. 402 Payment Required)
            if (relevantData && relevantData.summary) {
                reply = `(AI Offline) Here is what I know found in our database:\n\n**${relevantData.name}**\n${relevantData.summary}`;
            } else {
                reply = "I'm having trouble accessing my knowledge base right now. Please try again later.";
            }
        }

        // ===========================================
        // Step 5: Response Construction
        // ===========================================
        res.json({
            success: true,
            data: {
                reply,
                sources,
                related_sites: relevantData?.nearby_sites || [],
                context_used: !!relevantData
            }
        });

    } catch (error) {
        logger.error('Error in heritage assistant:', error);
        next(error);
    }
};

module.exports = {
    sendMessage,
    streamMessage,
    getChatHistory,
    clearChatHistory,
    heritageAssistant,
};
