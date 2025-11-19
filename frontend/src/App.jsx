import React, { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import MoodScanner from "./components/modules/MoodScanner";
import MoodSongs from "./components/modules/MoodSongs";

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <MainLayout>
      {/* Left Side: Scanner */}
      <aside>
        <MoodScanner setSongs={setSongs} />
      </aside>

      {/* Right Side: Player */}
      <section style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden' // Keep scroll internal
      }}>
        {songs.length > 0 ? (
          <MoodSongs songs={songs} />
        ) : (
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'var(--text-secondary)' 
          }}>
            <p>Scan your face to start listening</p>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default App;