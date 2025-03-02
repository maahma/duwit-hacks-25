const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const chatWithGemini = async (req, res) => {
    try {
        const { userMessage } = req.body;
        const API_KEY = process.env.GEMINI_API_KEY;

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Adjust the prompt based on the mood
        const prompt = `Act as a mental health chatbot. The user is feeling ${userMessage}. Offer them support. The user said: "${userMessage}"`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const reply = result.response.candidates[0]?.content.parts[0]?.text || "I'm here to listen.";

        res.json({ reply });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Error communicating with Gemini AI" });
    }
};

module.exports = { chatWithGemini };