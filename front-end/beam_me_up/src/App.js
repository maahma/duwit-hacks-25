import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { takePhoto } from './camera.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatWithGemini from "./Components/chat"; 

function App() {
  const [photoURL, setPhotoURL] = useState(null);
  const [uploadMode, setUploadMode] = useState("none");
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Mood selection here:）</p>
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
      </header>
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