import React, { useState } from "react";
import "./emotions.css"; // Import CSS for styling

const Emotions = () => {
  // State to track the currently clicked emotion
  const [clickedEmotion, setClickedEmotion] = useState(null);

  // Emotion data with their respective colors
  const emotions = {
    happiness: { color: "rgb(250, 195, 14)", subEmotions: ["joyful", "cheerful", "pleased", "amazed", "content", "excited"] },
    sadness: { color: "rgb(4, 40, 201)", subEmotions: ["melancholy", "sorrowful", "gloomy", "heartbroken", "wistful", "despodent"] },
    fear: { color: "rgb(89, 17, 190)", subEmotions: ["terrified", "anxious", "nervous", "panicked", "worried", "scared"] },
    disgust: { color: "rgb(7, 117, 11)", subEmotions: ["repulsed", "revolted", "nauseated", "appalled", "grossed", "..."] },
    anger: { color: "rgb(203, 3, 3)", subEmotions: ["furious", "irritated", "enraged", "livid", "anoyed", "resentful"] },
  };

  // Function to handle button click
  const handleEmotionClick = (emotion) => {
    setClickedEmotion(emotion); // Set the clicked emotion
  };

  return (
    <div className="emotions-container">
      {Object.entries(emotions).map(([emotion, data], index) => (
        <button
          key={emotion}
          className="star-button"
          style={{
            backgroundColor: clickedEmotion ? emotions[clickedEmotion].color : data.color, // Change color based on clicked emotion
          }}
          onClick={() => handleEmotionClick(emotion)}
        >
          {clickedEmotion
            ? emotions[clickedEmotion].subEmotions[index] // Show sub-emotion if an emotion is clicked
            : emotion} {/* Show main emotion otherwise */}
        </button>
      ))}
    </div>
  );
};

export default Emotions;