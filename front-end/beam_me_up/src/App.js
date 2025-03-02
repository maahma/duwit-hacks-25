import React, { useState } from 'react';
import './App.css';
// import { takePhoto } from './camera.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatWithGemini from "./Components/chat"; 
import Photo from "./Components/photo"
import NavBar from "./Components/navbar"

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar /> 
          <p>Mood selection here:）</p>
        </header>
        
        {/* Routes for different pages */}
        <Routes>
          <Route path="/chat" element={<ChatWithGemini />} />
          <Route path="/photo" element={<Photo />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;