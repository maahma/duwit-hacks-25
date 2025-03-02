import React, { useState } from 'react';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI('AIzaSyC7hsFMssBldoRVYYwJAnnGNbyzbjCqebA');

const GeminiChat = () => {
  const [mood, setMood] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [advice, setAdvice] = useState("");

  const handleMoodSubmit = async () => {
    if (!mood.trim()) {
      setError("Please enter your mood before requesting advice.");
      return;
    }

    setIsLoading(true);
    setError("");
    setAdvice("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `The user is feeling ${mood}. Please provide a short, positive, and encouraging piece of advice to help improve their mood. Keep the response under 100 words.`;

      const result = await model.generateContent(prompt);
      const text = await result.response.text(); // Corrected API call

      setAdvice(text);
    } catch (error) {
      console.error('Error fetching advice:', error);
      setError("Sorry, I couldn't get advice at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="mood-section">
          <h2>How are you feeling today?</h2>
          <div className="mood-input">
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Enter your mood"
              className="mood-text-input"
            />
            <button 
              onClick={handleMoodSubmit} 
              disabled={isLoading}
              className="mood-submit-button"
            >
              {isLoading ? 'Getting Advice...' : 'Get Advice'}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {advice && (
            <div className="advice-section">
              <h3>Here's some advice for you:</h3>
              <p className="advice-text">{advice}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default GeminiChat;