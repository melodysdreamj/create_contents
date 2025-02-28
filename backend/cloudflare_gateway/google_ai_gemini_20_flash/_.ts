// https://developers.cloudflare.com/ai-gateway/providers/google-ai-studio/

import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const GATEWAY_NAME = process.env.CLOUDFLARE_GATEWAY_NAME;
const GOOGLE_STUDIO_API_KEY = process.env.GOOGLE_STUDIO_API_KEY;

if (!ACCOUNT_ID || !GATEWAY_NAME || !GOOGLE_STUDIO_API_KEY) {
    throw new Error('Required environment variables are not set');
}

export async function requestCloudflareGatewayGemini20Flash(prompt: string): Promise<string | null> {
    try {
        console.log("Gemini 2.0 Flash chat started");

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-goog-api-key': GOOGLE_STUDIO_API_KEY || ''
        });

        const response = await fetch(
            `https://gateway.ai.cloudflare.com/v1/${ACCOUNT_ID}/${GATEWAY_NAME}/google-ai-studio/v1/models/gemini-2.0-flash:generateContent`,
            {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: prompt }
                            ]
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract the response text from the Gemini API response
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }

        return null;
    } catch (error) {
        console.error("Error in Gemini 2.0 Flash chat:", error);
        return null;
    }
}
