/**
 * Heritage Pulse - Chat Routes
 * ============================
 * Routes for AI-powered chat interactions.
 */

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const { validate, validationRules } = require('../middleware/validation');

/**
 * @route   POST /api/chat
 * @desc    Send a message and get AI response
 * @access  Public
 */
router.post(
    '/',
    validationRules.chatMessage,
    validate,
    chatController.sendMessage
);

/**
 * @route   POST /api/chat/stream
 * @desc    Send a message and get streaming AI response (SSE)
 * @access  Public
 */
router.post(
    '/stream',
    validationRules.chatMessage,
    validate,
    chatController.streamMessage
);

/**
 * @route   GET /api/chat/history/:conversationId
 * @desc    Get chat history for a conversation
 * @access  Public
 */
router.get(
    '/history/:conversationId',
    chatController.getChatHistory
);

/**
 * @route   DELETE /api/chat/history/:conversationId
 * @desc    Clear chat history for a conversation
 * @access  Public
 */
router.delete(
    '/history/:conversationId',
    chatController.clearChatHistory
);

/**
 * @route   POST /api/chat/heritage-assistant
 * @desc    Chat with Heritage Assistant AI
 * @access  Public
 */
router.post(
    '/heritage-assistant',
    chatController.heritageAssistant
);

module.exports = router;
