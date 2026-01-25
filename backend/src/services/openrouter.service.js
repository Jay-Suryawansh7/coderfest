/**
 * Heritage Pulse - OpenRouter Service
 * ====================================
 * Integration with OpenRouter AI API for chat completions.
 */

const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');
const { ApiError } = require('../middleware/errorHandler');

// Create axios instance for OpenRouter
const openRouterClient = axios.create({
    baseURL: config.openRouter.baseUrl,
    timeout: config.openRouter.timeout,
    headers: {
        'Authorization': `Bearer ${config.openRouter.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://heritage-pulse.app',
        'X-Title': 'Heritage Pulse',
    },
});

// Models configuration
const MODELS = {
    CHAT: config.openRouter.defaultModel || 'google/gemini-2.0-flash-001',
    REASONING: process.env.OPENROUTER_MODEL || 'deepseek/deepseek-r1', // Use configured model for reasoning
};

// System prompt for heritage-focused AI
const SYSTEM_PROMPT = `You are Heritage Pulse AI, an expert guide specializing in cultural heritage, historical sites, monuments, and traditions from around the world.

Your role is to:
- Provide accurate, engaging information about heritage sites and cultural traditions
- Share historical context and significance of monuments and landmarks
- Offer travel tips and visiting recommendations
- Explain cultural practices, festivals, and traditions
- Help users discover and appreciate cultural diversity

Be informative, enthusiastic, and respectful of all cultures. When unsure about specific facts, acknowledge limitations rather than inventing information.`;

/**
 * Send a chat completion request to OpenRouter
 */
const chat = async ({ messages, context = '' }) => {
    try {
        // Build messages array with system prompt
        const fullMessages = [
            { role: 'system', content: SYSTEM_PROMPT + (context ? `\n\nContext: ${context}` : '') },
            ...messages,
        ];

        const response = await openRouterClient.post('/chat/completions', {
            model: MODELS.CHAT,
            messages: fullMessages,
            temperature: 0.7,
            max_tokens: 2048,
        });

        if (!response.data?.choices?.[0]?.message) {
            throw new Error('Invalid response from OpenRouter');
        }

        return {
            content: response.data.choices[0].message.content,
            usage: response.data.usage,
            model: response.data.model,
        };
    } catch (error) {
        logger.error('OpenRouter API error:', error.response?.data || error.message);

        if (error.response?.status === 401) {
            throw ApiError.unauthorized('Invalid API key');
        }

        if (error.response?.status === 429) {
            throw ApiError.tooManyRequests('OpenRouter rate limit exceeded');
        }

        throw ApiError.serviceUnavailable('AI service temporarily unavailable');
    }
};

/**
 * Stream a chat completion response from OpenRouter
 */
const streamChat = async ({ messages, context = '', onChunk, onComplete, onError }) => {
    try {
        const fullMessages = [
            { role: 'system', content: SYSTEM_PROMPT + (context ? `\n\nContext: ${context}` : '') },
            ...messages,
        ];

        const response = await openRouterClient.post('/chat/completions', {
            model: MODELS.CHAT,
            messages: fullMessages,
            temperature: 0.7,
            max_tokens: 2048,
            stream: true,
        }, {
            responseType: 'stream',
        });

        response.data.on('data', (chunk) => {
            const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);

                    if (data === '[DONE]') {
                        onComplete();
                        return;
                    }

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices?.[0]?.delta?.content;

                        if (content) {
                            onChunk(content);
                        }
                    } catch (parseError) {
                        // Skip unparseable chunks
                    }
                }
            }
        });

        response.data.on('error', (error) => {
            logger.error('OpenRouter stream error:', error);
            onError(error);
        });

        response.data.on('end', () => {
            onComplete();
        });
    } catch (error) {
        logger.error('OpenRouter stream setup error:', error.response?.data || error.message);
        onError(error);
    }
};

/**
 * Generate a travel itinerary based on context data
 * @param {Object} contextData - Structured data about sites, location, and preferences
 * @returns {Promise<Object>} JSON itinerary object
 */
const generateItinerary = async (contextData) => {
    try {
        const systemPrompt = `You are an expert travel planner for Heritage Pulse.
Your task is to generate a detailed, culturally rich itinerary based ONLY on the provided context data.
DO NOT hallucinate sites that are not in the context or known to be in the nearby vicinity.
Focus on logistics, historical significance, and efficient routing.

Output must be valid JSON matching this structure:
{
  "title": "Itinerary Title",
  "summary": "Brief overview",
  "days": [
    {
      "day": 1,
      "theme": "Theme of the day",
      "activities": [
        {
          "time": "09:00",
          "activity": "Activity description",
          "location": "Location name",
          "notes": "Historical context or tips"
        }
      ]
    }
  ]
}`;

        const userMessage = `Create an itinerary based on the following data: ${JSON.stringify(contextData)}`;

        const response = await openRouterClient.post('/chat/completions', {
            model: MODELS.REASONING,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.6,
            // response_format: { type: 'json_object' }, // Removed for DeepSeek R1 compatibility
        });

        if (!response.data?.choices?.[0]?.message?.content) {
            throw new Error('No content received from AI');
        }

        try {
            let content = response.data.choices[0].message.content;

            // Clean up DeepSeek reasoning traces <think>...</think>
            content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

            // Extract JSON from code blocks if present
            const jsonMatch = content.match(/```json([\s\S]*?)```/);
            if (jsonMatch) {
                content = jsonMatch[1].trim();
            }

            return JSON.parse(content);
        } catch (parseError) {
            logger.error('Error parsing itinerary JSON:', parseError);
            logger.debug('Raw AI content:', response.data.choices[0].message.content);
            throw new Error('Failed to parse AI response into valid JSON');
        }

    } catch (error) {
        logger.error('Itinerary generation error:', error.message);
        if (error.response) {
            logger.error('OpenRouter response error:', JSON.stringify(error.response.data));
        }
        throw ApiError.internal('Failed to generate itinerary');
    }
};

/**
 * Check if OpenRouter API is available
 */
const healthCheck = async () => {
    try {
        // Simple request to check API availability
        const response = await openRouterClient.get('/models', {
            timeout: 5000,
        });

        return {
            status: 'healthy',
            modelsAvailable: response.data?.data?.length || 0,
        };
    } catch (error) {
        return {
            status: 'unhealthy',
            error: error.message,
        };
    }
};

module.exports = {
    chat,
    streamChat,
    generateItinerary,
    healthCheck,
};
