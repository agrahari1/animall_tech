"use client";

import { useState, useEffect, useRef } from "react";
import { startMilking, stopMilking } from "../services/api";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [sessionId, setSessionId] = useState<string | null>(null);

  // After stop
  const [showMilkInput, setShowMilkInput] = useState(false);
  const [milkQuantity, setMilkQuantity] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);

  /* ================= TIMER ================= */
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRunning && !isPaused) {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, isPaused]);

  /* ================= ACTIONS ================= */
  const handleStart = async () => {
    try {
      const res = await startMilking(); // start only
      setSessionId(res?.data?._id);

      setSeconds(0);
      setIsRunning(true);
      setIsPaused(false);
      setShowMilkInput(false);

      audioRef.current?.play();
    } catch (err) {
      console.error("Start failed", err);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    audioRef.current?.pause();
  };

  const handleResume = () => {
    setIsPaused(false);
    audioRef.current?.play();
  };

  const handleStop = () => {
    setIsPaused(true);
    setIsRunning(false);

    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;

    setShowMilkInput(true); // show milk input
  };

  const handleSubmitMilk = async () => {
    if (!milkQuantity) {
      alert("Enter milk quantity");
      return;
    }

    if (!sessionId) {
      alert("Session not found");
      return;
    }

    try {
      await stopMilking(sessionId, {
        milkQuantity: Number(milkQuantity),
        duration: seconds, // SEND DURATION
      });
    } catch (err) {
      console.error("Stop failed", err);
    }

    // Reset everything
    setSessionId(null);
    setSeconds(0);
    setMilkQuantity("");
    setShowMilkInput(false);
  };

  /* ================= HELPERS ================= */
  const formatTime = (t: number) => {
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  /* ================= UI ================= */
  return (
    <div className="w-full px-4 py-12 text-center">
      <h1 className="text-5xl font-black mb-12">Milking Harmony</h1>

      {/* Audio */}
      <audio ref={audioRef} src="/Moon-Waltz.mp3" loop />

      {/* ================= INITIAL ================= */}
      {!isRunning && !showMilkInput && (
      <button
  onClick={handleStart}
  className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold
             transition hover:bg-blue-700 hover:scale-105 cursor-pointer"
>
  Start Milking Session
</button>
      )}

      {/* ================= RUNNING ================= */}
      {isRunning && (
        <div className="bg-white shadow-xl rounded-2xl p-8 md:w-1/2 mx-auto">
          <p className="text-4xl font-mono text-blue-600 mb-6">
            {formatTime(seconds)}
          </p>

          <div className="flex justify-center gap-4">
            {!isPaused ? (
              <button
                onClick={handlePause}
                className="px-6 py-3 bg-yellow-500 text-white rounded-xl cursor-pointer"
              >
                Pause
              </button>
            ) : (
              <button
                onClick={handleResume}
                className="px-6 py-3 bg-green-500 text-white rounded-xl cursor-pointer"
              >
                Resume
              </button>
            )}

            <button
              onClick={handleStop}
              className="px-6 py-3 bg-red-500 text-white rounded-xl cursor-pointer"
            >
              Stop
            </button>
          </div>

          <p className="mt-4 text-gray-500">
            Music {isPaused ? "Paused" : "Playing"}
          </p>
        </div>
      )}

      {/* ================= MILK INPUT ================= */}
      {showMilkInput && (
        <div className="bg-white shadow-xl rounded-2xl p-8 md:w-1/2 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Enter Milk Quantity</h2>

          <p className="mb-4 text-gray-600">
            Session Duration:{" "}
            <span className="font-semibold">{formatTime(seconds)}</span>
          </p>

          <input
            type="number"
            step="0.01"
            value={milkQuantity}
            onChange={(e) => setMilkQuantity(e.target.value)}
            placeholder="Milk quantity (liters)"
            className="w-full px-4 py-3 rounded-lg border mb-6"
          />

          <button
            onClick={handleSubmitMilk}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold cursor-pointer"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
