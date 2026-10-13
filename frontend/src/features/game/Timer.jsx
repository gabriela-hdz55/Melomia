import { useEffect, useRef, useState } from "react";

export function formatElapsedTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return hours > 0
    ? `${hours}:${paddedMinutes}:${paddedSeconds}`
    : `${paddedMinutes}:${paddedSeconds}`;
}

export default function Timer({ isRunning, onComplete }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const startTime = useRef(null);
  const completed = useRef(false);

  useEffect(() => {
    if (!isRunning) {
      if (!completed.current) {
        const finalElapsedSeconds =
          startTime.current === null
            ? 0
            : Math.floor((Date.now() - startTime.current) / 1000);
        completed.current = true;
        setElapsedSeconds(finalElapsedSeconds);
        onComplete(finalElapsedSeconds);
      }
      return;
    }

    if (startTime.current === null) {
      startTime.current = Date.now();
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - startTime.current) / 1000)
      );
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [isRunning, onComplete]);

  return (
    <p role="timer" className="mb-3 font-medium">
      Time: {formatElapsedTime(elapsedSeconds)}
    </p>
  );
}