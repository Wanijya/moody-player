import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import api from "../../services/api"; 
import "../../styles/MoodScanner.css";

export default function MoodScanner({ setSongs }) {
  const videoRef = useRef();
  const [mood, setMood] = useState("Waiting...");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Ensure models are in public/models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => { videoRef.current.srcObject = stream; })
      .catch((err) => console.error(err));
  };

  const detectMood = async () => {
    setIsScanning(true);
    setMood("Detecting...");
    
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const detectedMood = Object.keys(expressions).reduce((a, b) => 
        expressions[a] > expressions[b] ? a : b
      );
      
      setMood(detectedMood.toUpperCase());
      
      try {
        const { data } = await api.get(`/songs?mood=${detectedMood}`);
        setSongs(data.songs);
      } catch (e) {
        console.error("API Error", e);
      }
    } else {
      setMood("No Face Found");
    }
    setIsScanning(false);
  };

  return (
    <div className="scanner-card">
      <div className="video-wrapper">
        <video ref={videoRef} autoPlay muted />
        <div className={`scan-overlay ${isScanning ? "active" : ""}`}></div>
      </div>
      <div className="controls">
        <div className="mood-display">
          <span>Current Mood</span>
          <h3>{mood}</h3>
        </div>
        <button onClick={detectMood} disabled={isScanning} className="scan-btn">
          {isScanning ? "Scanning..." : "Analyze Mood"}
        </button>
      </div>
    </div>
  );
}