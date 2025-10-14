import { useEffect, useState } from "react";

interface FaceRecognitionOverlayProps {
  isActive: boolean;
}

export const FaceRecognitionOverlay = ({ isActive }: FaceRecognitionOverlayProps) => {
  const [scanPosition, setScanPosition] = useState(0);
  const [points, setPoints] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    if (!isActive) {
      setScanPosition(0);
      setPoints([]);
      return;
    }

    // Generate random facial landmark points
    const landmarkPoints = Array.from({ length: 12 }, (_, i) => ({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      delay: i * 0.1,
    }));
    setPoints(landmarkPoints);

    // Animate scanning line
    const interval = setInterval(() => {
      setScanPosition((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 30);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Scanning line */}
      <div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_10px_rgba(106,171,233,0.8)]"
        style={{
          top: `${scanPosition}%`,
          transition: "top 0.03s linear",
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-secondary/20" />
          ))}
        </div>
      </div>

      {/* Facial landmark points */}
      {points.map((point, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-pulse"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            animationDelay: `${point.delay}s`,
          }}
        >
          <div className="w-full h-full rounded-full bg-secondary shadow-[0_0_8px_rgba(106,171,233,0.9)]" />
          {/* Connection lines */}
          {i > 0 && (
            <svg
              className="absolute top-0 left-0 w-full h-full -z-10"
              style={{
                width: `${Math.abs(points[i - 1].x - point.x) * 4}px`,
                height: `${Math.abs(points[i - 1].y - point.y) * 4}px`,
              }}
            >
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="rgba(106,171,233,0.4)"
                strokeWidth="1"
              />
            </svg>
          )}
        </div>
      ))}

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-secondary animate-pulse" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-secondary animate-pulse" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-secondary animate-pulse" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-secondary animate-pulse" />

      {/* Center focus box */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 border-2 border-secondary/60 animate-pulse">
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-secondary rounded-full" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-secondary rounded-full" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-secondary rounded-full" />
      </div>

      {/* Analyzing text */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-secondary text-sm font-mono animate-pulse">
        ANALYZING...
      </div>
    </div>
  );
};
