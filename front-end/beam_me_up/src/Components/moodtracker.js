import React from 'react';

function MoodTracker({ mood, setMood, handleMoodSubmit, isLoading }) {
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
    </div>
  );
}

export default MoodTracker;