"use client";

import { useState } from "react";
import { startMilking, stopMilking } from "../services/api";
import MusicPlayer from "./MusicPlayer";

const StartMilking = () => {
  const [animalName, setAnimalName] = useState("");
  const [sessionId, setSessionId] = useState(null);

  const handleStart = async () => {
    if (!animalName) return alert("Enter animal name");

    const res = await startMilking({
      animalName,
      musicPlayed: "Relaxing Music"
    });

    setSessionId(res.data._id);
  };

  const handleStop = async () => {
    await stopMilking(sessionId);
    setSessionId(null);
    alert("Milking session stopped");
  };

  return (
    <div>
      <h2>Start Milking</h2>

      <input
        placeholder="Animal Name"
        value={animalName}
        onChange={(e) => setAnimalName(e.target.value)}
      />

      <button onClick={handleStart}>Start</button>

      {sessionId && (
        <>
          <MusicPlayer src="/music.mp3" />
          <button onClick={handleStop}>Stop</button>
        </>
      )}
    </div>
  );
};

export default StartMilking;
