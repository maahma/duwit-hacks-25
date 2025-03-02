import React, { useState } from "react";
import "./MoodDetails.css"; // Import CSS for styling
import Photos from "./photo.jsx"
import GeminiChat from "./geminiChat.jsx"

const MoodDetails = ({ mood, onBack }) => {
  const [selectedSubMood, setSelectedSubMood] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  

  // Sub-emotions for the selected mood
  const subEmotions = {
    happiness: ["joyful", "cheerful", "pleased", "amazed", "content", "excited"],
    sadness: ["melancholy", "sorrowful", "gloomy", "heartbroken", "wistful", "despodent"],
    fear: ["terrified", "anxious", "nervous", "panicked", "worried", "scared"],
    disgust: ["repulsed", "revolted", "nauseated", "appalled", "grossed", "..."],
    anger: ["furious", "irritated", "enraged", "livid", "anoyed", "resentful"],
  };

  // Function to handle sub-mood selection
  const handleSubMoodClick = (subMood) => {
    setSelectedSubMood(subMood);
    setShowPhotoOptions(true); // Show photo options after selecting a sub-mood
  };

  // Function to handle posting the mood
  const handlePostMood = (withPhoto) => {
    if (withPhoto) {
      alert(`Posting "${selectedSubMood}" with a photo.`);
      // Add logic to take/choose a photo and post it
    } else {
      alert(`Posting "${selectedSubMood}" without a photo.`);
      // Add logic to post only the mood
    }
    onBack(); // Go back to the main screen
  };

  return (
    <div className="mood-details-container">
      <h2>Select a subcategory for {mood}:</h2>

      {/* Show sub-emotions if no sub-mood is selected */}
      {!showPhotoOptions && (
        <div className="sub-emotions-container">
          {subEmotions[mood].map((subMood) => (
            <button
              key={subMood}
              className="sub-mood-button"
              onClick={() => handleSubMoodClick(subMood)}
            >
              {subMood}
            </button>
          ))}
        </div>
      )}

      {/* Show photo options if a sub-mood is selected */}
      {showPhotoOptions && (
        <div className="photo-options-container">
          <h3>Do you want to post a photo with your mood?</h3>
          {/*<button onClick={() => handlePostMood(true)}>Take/Choose a Photo</button>*/}
          <Photos />
          <button onClick={() => handlePostMood(false)}>Post Only Mood</button>
          <GeminiChat />
        </div>
      )}

      {/* Back button to return to the main screen */}
      <button className="back-button" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default MoodDetails;