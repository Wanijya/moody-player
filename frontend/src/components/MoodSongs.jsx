import React, { useState, useRef } from "react";
import "./moodSongs.css";

const MoodSongs = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // We use a single ref to track the currently playing audio element
  const audioRef = useRef(new Audio());

  const handlePlayPause = (songUrl, index) => {
    const audio = audioRef.current;

    // If clicking the specific song that is already active
    if (currentSongIndex === index) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      // If clicking a new song
      audio.src = songUrl;
      audio.load();
      audio.play();
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }

    // Reset state when song ends
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentSongIndex(null);
    };
  };

  return (
    <div className="mood-songs">
      <h2>Recommended Songs</h2>
      <div className="song-list">
        {songs.map((song, index) => {
          const isActive = currentSongIndex === index;

          return (
            <div 
              className={`song ${isActive ? "active" : ""}`} 
              key={index}
              onClick={() => handlePlayPause(song.audio, index)}
            >
              <div className="song-left">
                {/* Number or Equalizer Animation */}
                <div className="song-index">
                  {isActive && isPlaying ? (
                    <div className="playing-anim">
                      <span></span><span></span><span></span>
                    </div>
                  ) : (
                    <span className="index-num">{index + 1}</span>
                  )}
                </div>
                
                <div className="title">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>

              <div className="play-pause-button">
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