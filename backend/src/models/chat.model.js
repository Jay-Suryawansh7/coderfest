/**
 * Heritage Pulse - Chat Message Model
 * ====================================
 * Data validation schema for chat messages.
 */

/**
 * Chat message schema definition
 */
const chatMessageSchema = {
    role: { type: 'string', required: true, enum: ['user', 'assistant', 'system'] },
    content: { type: 'string', required: true, minLength: 1, maxLength: 10000 },
    timestamp: { type: 'date', required: false },
    metadata: { type: 'object', required: false },
};

/**
 * Conversation schema definition
 */
const conversationSchema = {
    id: { type: 'string', required: true },
    messages: { type: 'array', required: true },
    createdAt: { type: 'date', required: true },
    updatedAt: { type: 'date', required: true },
};

/**
 * Validate chat message data
 */
const validateChatMessage = (data) => {
    const errors = [];
    const validRoles = ['user', 'assistant', 'system'];

    if (!data.role || !validRoles.includes(data.role)) {
        errors.push({ field: 'role', message: `Role must be one of: ${validRoles.join(', ')}` });
    }

    if (!data.content || typeof data.content !== 'string') {
        errors.push({ field: 'content', message: 'Content is required and must be a string' });
    } else if (data.content.length > 10000) {
        errors.push({ field: 'content', message: 'Content must not exceed 10000 characters' });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

/**
 * Create a new chat message
 */
const createChatMessage = (role, content, metadata = {}) => {
    return {
        role,
        content: content.toString().trim(),
        timestamp: new Date().toISOString(),
        metadata,
    };
};

/**
 * Create a new conversation
 */
const createConversation = (id = null) => {
    const now = new Date().toISOString();
    return {
        id: id || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        messages: [],
        createdAt: now,
        updatedAt: now,
    };
};

module.exports = {
    chatMessageSchema,
    conversationSchema,
    validateChatMessage,
    createChatMessage,
    createConversation,
};
