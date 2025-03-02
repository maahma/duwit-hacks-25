import React, { useState } from 'react';
import './App.css';
import { takePhoto } from './camera.jsx';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Emotions from './emotions.jsx';

// Initialize the API
const genAI = new GoogleGenerativeAI('AIzaSyC7hsFMssBldoRVYYwJAnnGNbyzbjCqebA');

function App() {
  const [photoURL, setPhotoURL] = useState(null);
  const [uploadMode, setUploadMode] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [uploadOption, setUploadOption] = useState("");
  const [mood, setMood] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTakePhoto = () => {
    if (uploadMode === "photo") {
      takePhoto(setPhotoURL, setShowModal);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setPhotoURL(base64data);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    console.log("Uploading photo...");
    setShowModal(false);
  };

  const handleRetake = () => {
    setPhotoURL(null);
    setShowModal(false);
    handleTakePhoto();
  };

  const handleMoodSubmit = async () => {
    if (!mood.trim()) {
      setError("Please enter your mood before requesting advice.");
      return;
    }
  
    setIsLoading(true);
    setError("");
    setAdvice("");
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
  
      const prompt = `The user is feeling ${mood}. Please provide a short, positive, and encouraging piece of advice to help improve their mood. Keep the response under 100 words.`;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
  
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
      <div className="App-header">
        <div className="indicator">
          <div className="dot active" data-page="1"></div>
          <div className="dot" data-page="2"></div>
          <div className="dot" data-page="3"></div>
        </div>
        <div id="dashboard-page" className="page">
          <div className="dashboard-container">
            <h1>Welcome to your Mood Tracker</h1>
            <p>Your daily mood check-in will arrive at a random time.</p>
            <div className="mood-history"></div>
          </div>
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Emotions />
        <select value={uploadMode} onChange={(e) => setUploadMode(e.target.value)}>
          <option value="none">Do you want to take a photo</option>
          <option value="none">Nope, I don't have mood</option>
          <option value="photo">Take Photo and Upload</option>
          <option value="file">Upload from Folder</option>
        </select>
        <div>
           {uploadMode === "photo" && (
            <button className="App-link" onClick={handleTakePhoto}>
              Take Photo
            </button>
          )}
          {uploadMode === "file" && (
            <input type="file" accept="image/*" onChange={handleFileChange} />
          )}
        </div>
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
              <h3 >Here's some advice for you:</h3>
              <p className="advice-text">{advice}</p>
            </div>
          )}
        </div>
      {showModal && photoURL && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Photo Preview</h2>
            <img src={photoURL} alt="Selected" className="modal-image" />
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

