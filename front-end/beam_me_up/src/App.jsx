import React, { useState } from 'react';
import './App.css';
import { takePhoto } from './camera.jsx'; // Make sure this file is correctly imported
import Emotions from './emotions.jsx';

function App() {
  const [photoURL, setPhotoURL] = useState(null);
  const [uploadMode, setUploadMode] = useState("none");

  const handleTakePhoto = () => {
    if (uploadMode === "photo") {
      takePhoto(setPhotoURL);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setPhotoURL(base64data);
        if (window.confirm('Do you want to upload the photo?')) {
          // You can call an upload function here if needed.
        }
      };
      reader.readAsDataURL(file);
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
      </div>
      {photoURL && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setPhotoURL(null)}>&times;</span>
            <h2>Beam me uppppp</h2>
            <img src={photoURL} alt="Selected" className="modal-image" />
            <a href={photoURL} download="photo.png">Download Photo</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;