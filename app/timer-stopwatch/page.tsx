"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

type Mode = "timer" | "stopwatch";

interface Lap {
  number: number;
  time: number;
  total: number;
}

const PRESETS = [
  { label: "1 min", seconds: 60 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
  { label: "25 min", seconds: 1500 },
  { label: "30 min", seconds: 1800 },
  { label: "45 min", seconds: 2700 },
  { label: "1 hour", seconds: 3600 }
];

export default function TimerStopwatchPage() {
  const [mode, setMode] = useState<Mode>("timer");

  // Timer state
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const lastLapTime = useRef(0);

  // Audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // Create audio context for alarm
    audioRef.current = new Audio();
    audioRef.current.src =
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQAnhsnR0MO0kpOXq8PW2NDAwszY1dXRw7hqR0xyi8LKy9HCwdPd4eLq";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerRunning && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            setTimerFinished(true);
            // Play alarm
            if (audioRef.current) {
              audioRef.current.loop = true;
              audioRef.current.play().catch(() => {});
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerRunning, timerRemaining]);

  // Stopwatch logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [stopwatchRunning]);

  const formatTime = (totalSeconds: number, showHours = true): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (showHours && hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatStopwatchTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  // Timer controls
  const startTimer = () => {
    const total = timerHours * 3600 + timerMinutes * 60 + timerSeconds;
    if (total > 0) {
      setTimerRemaining(total);
      setTimerRunning(true);
      setTimerFinished(false);
    }
  };

  const pauseTimer = () => setTimerRunning(false);

  const resumeTimer = () => {
    if (timerRemaining > 0) {
      setTimerRunning(true);
    }
  };

  const resetTimer = useCallback(() => {
    setTimerRunning(false);
    setTimerRemaining(0);
    setTimerFinished(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const stopAlarm = () => {
    setTimerFinished(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const applyPreset = (seconds: number) => {
    setTimerHours(Math.floor(seconds / 3600));
    setTimerMinutes(Math.floor((seconds % 3600) / 60));
    setTimerSeconds(seconds % 60);
    resetTimer();
  };

  // Stopwatch controls
  const startStopwatch = () => setStopwatchRunning(true);
  const pauseStopwatch = () => setStopwatchRunning(false);

  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
    setLaps([]);
    lastLapTime.current = 0;
  };

  const addLap = () => {
    const lapTime = stopwatchTime - lastLapTime.current;
    setLaps((prev) => [
      ...prev,
      {
        number: prev.length + 1,
        time: lapTime,
        total: stopwatchTime
      }
    ]);
    lastLapTime.current = stopwatchTime;
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Timer & Stopwatch
        </h1>
        <p className="mt-2 text-gray-700">
          Countdown timer and stopwatch with lap times. Works entirely in your
          browser, even offline.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Mode selection */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode("timer")}
            className={`flex-1 px-4 py-3 rounded-md font-medium ${
              mode === "timer"
                ? "bg-black text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            ⏱️ Timer
          </button>
          <button
            onClick={() => setMode("stopwatch")}
            className={`flex-1 px-4 py-3 rounded-md font-medium ${
              mode === "stopwatch"
                ? "bg-black text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            ⏱️ Stopwatch
          </button>
        </div>

        {/* Timer Mode */}
        {mode === "timer" && (
          <div className="space-y-4">
            {/* Timer display */}
            <div
              className={`text-center p-8 rounded-lg ${timerFinished ? "bg-red-100 animate-pulse" : "bg-gray-50"}`}
            >
              <div className="text-6xl sm:text-8xl font-mono font-bold tracking-wider">
                {formatTime(
                  timerRemaining ||
                    timerHours * 3600 + timerMinutes * 60 + timerSeconds
                )}
              </div>
              {timerFinished && (
                <div className="mt-4">
                  <p className="text-red-600 font-medium mb-2">
                    Time&apos;s up!
                  </p>
                  <button
                    onClick={stopAlarm}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Stop Alarm
                  </button>
                </div>
              )}
            </div>

            {/* Timer input (when not running) */}
            {!timerRunning && !timerFinished && timerRemaining === 0 && (
              <div className="flex justify-center gap-2">
                <div className="text-center">
                  <label
                    htmlFor="hours-input"
                    className="block text-xs text-gray-500 mb-1"
                  >
                    Hours
                  </label>
                  <input
                    id="hours-input"
                    type="number"
                    min="0"
                    max="99"
                    value={timerHours}
                    onChange={(e) =>
                      setTimerHours(
                        Math.min(99, Math.max(0, parseInt(e.target.value) || 0))
                      )
                    }
                    className="w-20 text-center border border-gray-300 rounded-md px-2 py-2 text-2xl font-mono"
                  />
                </div>
                <span className="text-4xl self-end pb-2">:</span>
                <div className="text-center">
                  <label
                    htmlFor="minutes-input"
                    className="block text-xs text-gray-500 mb-1"
                  >
                    Minutes
                  </label>
                  <input
                    id="minutes-input"
                    type="number"
                    min="0"
                    max="59"
                    value={timerMinutes}
                    onChange={(e) =>
                      setTimerMinutes(
                        Math.min(59, Math.max(0, parseInt(e.target.value) || 0))
                      )
                    }
                    className="w-20 text-center border border-gray-300 rounded-md px-2 py-2 text-2xl font-mono"
                  />
                </div>
                <span className="text-4xl self-end pb-2">:</span>
                <div className="text-center">
                  <label
                    htmlFor="seconds-input"
                    className="block text-xs text-gray-500 mb-1"
                  >
                    Seconds
                  </label>
                  <input
                    id="seconds-input"
                    type="number"
                    min="0"
                    max="59"
                    value={timerSeconds}
                    onChange={(e) =>
                      setTimerSeconds(
                        Math.min(59, Math.max(0, parseInt(e.target.value) || 0))
                      )
                    }
                    className="w-20 text-center border border-gray-300 rounded-md px-2 py-2 text-2xl font-mono"
                  />
                </div>
              </div>
            )}

            {/* Timer controls */}
            <div className="flex justify-center gap-2">
              {!timerRunning && timerRemaining === 0 && !timerFinished && (
                <button
                  onClick={startTimer}
                  className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 font-medium"
                >
                  Start
                </button>
              )}
              {timerRunning && (
                <button
                  onClick={pauseTimer}
                  className="px-8 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 font-medium"
                >
                  Pause
                </button>
              )}
              {!timerRunning && timerRemaining > 0 && !timerFinished && (
                <>
                  <button
                    onClick={resumeTimer}
                    className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                  >
                    Resume
                  </button>
                  <button
                    onClick={resetTimer}
                    className="px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
                  >
                    Reset
                  </button>
                </>
              )}
            </div>

            {/* Presets */}
            <div className="border border-gray-300 rounded-lg p-4">
              <span className="text-sm font-medium text-gray-700 mb-2 block">
                Quick Presets
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset.seconds)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stopwatch Mode */}
        {mode === "stopwatch" && (
          <div className="space-y-4">
            {/* Stopwatch display */}
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="text-6xl sm:text-8xl font-mono font-bold tracking-wider">
                {formatStopwatchTime(stopwatchTime)}
              </div>
            </div>

            {/* Stopwatch controls */}
            <div className="flex justify-center gap-2">
              {!stopwatchRunning && stopwatchTime === 0 && (
                <button
                  onClick={startStopwatch}
                  className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 font-medium"
                >
                  Start
                </button>
              )}
              {stopwatchRunning && (
                <>
                  <button
                    onClick={pauseStopwatch}
                    className="px-8 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 font-medium"
                  >
                    Pause
                  </button>
                  <button
                    onClick={addLap}
                    className="px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
                  >
                    Lap
                  </button>
                </>
              )}
              {!stopwatchRunning && stopwatchTime > 0 && (
                <>
                  <button
                    onClick={startStopwatch}
                    className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                  >
                    Resume
                  </button>
                  <button
                    onClick={resetStopwatch}
                    className="px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
                  >
                    Reset
                  </button>
                </>
              )}
            </div>

            {/* Laps */}
            {laps.length > 0 && (
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <span className="text-sm font-medium">
                    Laps ({laps.length})
                  </span>
                </div>
                <div className="max-h-48 overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left px-4 py-2">Lap</th>
                        <th className="text-right px-4 py-2">Lap Time</th>
                        <th className="text-right px-4 py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...laps].reverse().map((lap) => (
                        <tr key={lap.number} className="border-b">
                          <td className="px-4 py-2">#{lap.number}</td>
                          <td className="text-right px-4 py-2 font-mono">
                            {formatStopwatchTime(lap.time)}
                          </td>
                          <td className="text-right px-4 py-2 font-mono text-gray-500">
                            {formatStopwatchTime(lap.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> This timer runs entirely in your
          browser. No data is sent to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Choose Timer or Stopwatch mode</li>
          <li>
            For Timer: Set the duration manually or use a preset, then click
            Start
          </li>
          <li>
            For Stopwatch: Click Start to begin, use Lap to record split times
          </li>
          <li>Pause and resume at any time</li>
          <li>Reset to start over</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">Tips</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The 25-minute preset is perfect for Pomodoro technique study
            sessions
          </li>
          <li>Laps are useful for tracking intervals during workouts</li>
          <li>The timer continues running even if you switch browser tabs</li>
          <li>Keep the tab open for the alarm to sound when the timer ends</li>
        </ul>
      </section>
    </div>
  );
}
