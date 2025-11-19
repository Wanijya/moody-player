import React from "react";
import "../../styles/MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="main-container">
      <header className="top-nav">
        <div className="logo">Moodify <span className="badge">AI</span></div>
        <div className="status">Pro Member</div>
      </header>
      <main className="dashboard-grid">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;