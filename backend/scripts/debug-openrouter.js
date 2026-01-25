require('dotenv').config();
const axios = require('axios');

const KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'deepseek/deepseek-r1:free';

console.log('Testing OpenRouter connection...');
console.log('Key:', KEY ? `${KEY.substring(0, 5)}...` : 'MISSING');
console.log('Model:', MODEL);

async function test() {
    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: MODEL,
            messages: [
                { role: 'user', content: 'Say hello in JSON format: {"message": "hello"}' }
            ],
            temperature: 0.6
        }, {
            headers: {
                'Authorization': `Bearer ${KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://heritage-test.com',
                'X-Title': 'Heritage Test'
            }
        });

        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

test();
