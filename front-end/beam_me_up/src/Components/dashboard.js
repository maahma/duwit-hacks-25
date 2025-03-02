import React from 'react';
import Emotions from '../emotions.jsx';

function Dashboard() {
  return (
    <div id="dashboard-page" className="page">
      <div className="dashboard-container">
        <h1>Welcome to your Mood Tracker</h1>
        <p>Your daily mood check-in buddy</p>
        <div className="mood-history"></div>
      </div>

      {/* Mood Tracker Component */}
      <Emotions />
    </div> 
  );
}

export default Dashboard;