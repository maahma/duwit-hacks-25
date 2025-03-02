import React, { useState } from "react";
import "./emotions.css"; // Import CSS for styling

const Emotions = () => {
  // State to track the current emotion level
  const [isSubEmotion, setIsSubEmotion] = useState(false);

  // Main emotions and their corresponding sub-emotions
  const emotions = {
    happiness: ["joyful", "cheerful", "pleased", "amazed", "content", "excited"],
    sadness: ["melancholy", "sorrowful", "gloomy", "heartbroken", "wistful", "despodent"],
    fear: ["terrified", "anxious", "nervous", "panicked", "worried", "scared"],
    disgust: ["repulsed", "revolted", "nauseated", "appalled", "grossed", "..."],
    anger: ["furious", "irritated", "enraged", "livid", "anoyed", "resentful"],
  };

  // Function to handle button click
  const handleEmotionClick = () => {
    setIsSubEmotion(!isSubEmotion); // Toggle between main and sub-emotions
  };

  return (
    <div className="emotions-container">
      {Object.keys(emotions).map((emotion, index) => (
        <button
          key={index}
          className="star-button"
          onClick={handleEmotionClick}
        >
          {isSubEmotion ? emotions[emotion][index] : emotion}
        </button>
      ))}
    </div>
  );
};

export default Emotions;