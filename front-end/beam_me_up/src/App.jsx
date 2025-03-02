import React, { useState } from "react";
import Emotions from "./emotions"; // Import the Emotions component
import MoodDetails from "./MoodDetails"; // Import the MoodDetails component
import "./App.css"; // Import CSS for styling

const App = () => {
  const [selectedMood, setSelectedMood] = useState(null); // Track the selected mood
  const [showMoodDetails, setShowMoodDetails] = useState(false); // Track if mood details should be shown

  // Function to handle mood selection
  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setShowMoodDetails(true); // Show the mood details component
  };

  // Function to go back to the main mood selection screen
  const handleBack = () => {
    setSelectedMood(null);
    setShowMoodDetails(false);
  };

  return (
    <div className="App">
      <h1>Welcome to your Mood Tracker. Your daily mood check-in will arrive at a random time.</h1>

      {/* Show the Emotions component if no mood is selected */}
      {!showMoodDetails && <Emotions onMoodClick={handleMoodClick} />}

      {/* Show the MoodDetails component if a mood is selected */}
      {showMoodDetails && (
        <MoodDetails mood={selectedMood} onBack={handleBack} />
      )}
    </div>
  );
};

export default App;