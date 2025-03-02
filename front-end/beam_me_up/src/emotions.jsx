import React from "react";
import "./emotions.css"; // Import CSS for styling

const Emotions = ({ onMoodClick }) => {
  // Emotion data with their respective colors
  const emotions = {
    happiness: { color: "yellow", subEmotions: ["joyful", "cheerful", "pleased", "amazed", "content", "excited"] },
    sadness: { color: "blue", subEmotions: ["melancholy", "sorrowful", "gloomy", "heartbroken", "wistful", "despodent"] },
    fear: { color: "purple", subEmotions: ["terrified", "anxious", "nervous", "panicked", "worried", "scared"] },
    disgust: { color: "green", subEmotions: ["repulsed", "revolted", "nauseated", "appalled", "grossed", "..."] },
    anger: { color: "red", subEmotions: ["furious", "irritated", "enraged", "livid", "anoyed", "resentful"] },
  };

  return (
    <div className="emotions-container">
      {Object.entries(emotions).map(([emotion, data]) => (
        <button
          key={emotion}
          className="star-button"
          style={{ backgroundColor: data.color }}
          onClick={() => onMoodClick(emotion)}
        >
          {emotion}
        </button>
      ))}
    </div>
  );
};

export default Emotions;