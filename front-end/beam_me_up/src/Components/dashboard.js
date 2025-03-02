import React from 'react';

function Dashboard() {
  return (
    <div id="dashboard-page" className="page">
      <div className="dashboard-container">
        <h1>Welcome to your Mood Tracker</h1>
        <p>Your daily mood check-in buddy</p>
        <div className="mood-history"></div>
      </div>
    </div>
  );
}

export default Dashboard;