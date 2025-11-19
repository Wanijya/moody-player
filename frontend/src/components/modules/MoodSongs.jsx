import React, { useState, useRef, useEffect } from "react";
import "../../styles/MoodSongs.css"; // CSS path updated for new structure

const MoodSongs = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Single audio instance for the component
  const audioRef = useRef(new Audio());

  // Jab songs list change ho (nayi mood detect hone par), player reset karein
  useEffect(() => {
    audioRef.current.pause();
    setIsPlaying(false);
    setCurrentSongIndex(null);
  }, [songs]);

  const handlePlayPause = (songUrl, index) => {
    const audio = audioRef.current;

    // Agar same song click kiya
    if (currentSongIndex === index) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      // Agar naya song click kiya
      audio.src = songUrl;
      audio.load(); // Ensure audio loads
      audio.play();
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }

    // Jab gaana khatam ho jaye
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentSongIndex(null);
    };
  };

  return (
    <div className="mood-songs-container">
      <div className="playlist-header">
        <h2>Recommended Songs</h2>
        <span className="song-count">{songs.length} Songs</span>
      </div>

      <div className="song-list-scroll">
        {songs.map((song, index) => {
          const isActive = currentSongIndex === index;

          return (
            <div 
              className={`song-row ${isActive ? "active" : ""}`} 
              key={index}
              onClick={() => handlePlayPause(song.audio, index)}
            >
              <div className="song-info-left">
                {/* Index ya Equalizer Animation */}
                <div className="song-index">
                  {isActive && isPlaying ? (
                    <div className="equalizer">
                      <span></span><span></span><span></span>
                    </div>
                  ) : (
                    <span className="index-num">{index + 1}</span>
                  )}
                </div>
                
                {/* Song Details */}
                <div className="song-details">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>

              {/* Play/Pause Icon */}
              <div className="action-btn">
                {isActive && isPlaying ? (
                  <i className="ri-pause-circle-fill"></i>
                ) : (
                  <i className="ri-play-circle-fill"></i>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSongs;