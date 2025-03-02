import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ChatWithGemini from "./Components/chat"; 
import Photo from "./Components/photo"
import NavBar from "./Components/navbar"
import Dashboard from "./Components/dashboard"

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <p>Mood selection here:）</p> */}
          <Dashboard /> 
          <NavBar /> 
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