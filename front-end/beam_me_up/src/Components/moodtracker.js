import React, { useState } from 'react';
import Emotions from './emotions.jsx';

function MoodTracker() {
    const [mood, setMood] = useState("");
    const [advice, setAdvice] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleMoodSubmit = async () => {
        if (!mood.trim()) {
            setError("Please enter your mood before requesting advice.");
            return;
        }

        setIsLoading(true);
        setError("");
        setAdvice("");

        try {
            const response = await fetch("/api/chat-with-gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userMessage: mood }),
            });

            const data = await response.json();
            setAdvice(data.reply);
        } catch (error) {
            console.error('Error fetching advice:', error);
            setError("Sorry, I couldn't get advice at this time. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                    {isLoading ? "Getting Advice..." : "Get Advice"}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {advice && <p className="advice-message">{advice}</p>}
        </div>
    );
}

export default MoodTracker;