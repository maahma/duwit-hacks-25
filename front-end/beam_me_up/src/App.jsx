import React, { useState, useEffect } from "react";
import Emotions from "./emotions"; // Import the Emotions component
import MoodDetails from "./MoodDetails"; // Import the MoodDetails component
import "./App.css"; // Import CSS for styling
import { takePhoto } from "./camera";

const App = () => {
  const [selectedMood, setSelectedMood] = useState(null); // Track the selected mood
  const [showMoodDetails, setShowMoodDetails] = useState(false); // Track if mood details should be shown
  const [photoURL, setPhotoURL] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleTakePhoto = () => {
    takePhoto(setPhotoURL,setShowModal);
  }

  const handleRetake = () => {
    setPhotoURL(null);
    setShowModal(false);
    handleTakePhoto();
  }

  const handleUpload = () => {
    console.log("uploading photo...");
    setShowModal(false);
  }

  // Generate stars and clouds for the background
  useEffect(() => {
    const spaceBackground = document.querySelector(".space-background");

    // Generate stars
    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;

      // Some stars are more yellowish
      if (Math.random() > 0.7) {
        star.style.backgroundColor = "#fffbcc";
      }

      spaceBackground.appendChild(star);
    }

    // Generate clouds
    for (let i = 0; i < 10; i++) {
      const cloud = document.createElement("div");
      cloud.classList.add("cloud");
      cloud.style.top = `${Math.random() * 100}%`;
      cloud.style.left = `${Math.random() * 100}%`;
      cloud.style.width = `${Math.random() * 300 + 100}px`;
      cloud.style.height = `${Math.random() * 100 + 50}px`;
      spaceBackground.appendChild(cloud);
    }
  }, []);

  return (
    <div className="App">
      {/* Space Background */}
      <div className="space-background"></div>

      {/* Main Content */}
      <h1>Welcome to your Mood Tracker.</h1>
      <p>Your daily mood check-in will arrive at a random time.</p>

      {/* Show the Emotions component if no mood is selected */}
      {!showMoodDetails && <Emotions onMoodClick={handleMoodClick} />}

      {/* Show the MoodDetails component if a mood is selected */}
      {showMoodDetails && (
        <MoodDetails mood={selectedMood} onBack={handleBack} />
      )}

      {showModal && photoURL && (
        <div className="modal">
          <div className="modal-content">
            <h2>Photo Preview</h2>
            <img src={photoURL} alt="Captured" style={{ maxWidth: "100%" }} />
            <div className="modal-buttons">
              <button onClick={handleUpload}>Upload</button>
              <button onClick={handleRetake}>Retake</button>
            </div>
          </div>
        </div> 
      )}
    </div> 
  );
}

export default App;


