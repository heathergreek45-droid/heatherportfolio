import { useEffect, useState } from "react";

type Props = {
  side: "left" | "right";
};

/**
 * A small robot mascot whose eyes (and slight body tilt) follow the cursor.
 * Positioned absolutely; meant to be placed inside a relative hero container.
 */
const CursorRobot = ({ side }: Props) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Compute eye offset based on cursor position relative to viewport center on this side
  const centerX = side === "left" ? window.innerWidth * 0.15 : window.innerWidth * 0.85;
  const centerY = window.innerHeight * 0.5;
  const dx = pos.x - centerX;
  const dy = pos.y - centerY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const maxOffset = 4;
  const eyeX = (dx / dist) * Math.min(maxOffset, dist / 40);
  const eyeY = (dy / dist) * Math.min(maxOffset, dist / 40);
  const tilt = Math.max(-8, Math.min(8, dx / 80));

  return (
    <div
      className={`hidden md:flex pointer-events-none absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-4 lg:left-12" : "right-4 lg:right-12"
      } z-20`}
      aria-hidden="true"
    >
      <svg
        width="90"
        height="110"
        viewBox="0 0 90 110"
        style={{ transform: `rotate(${tilt}deg)`, transition: "transform 0.15s ease-out" }}
      >
        {/* Antenna */}
        <line x1="45" y1="10" x2="45" y2="22" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="45" cy="8" r="4" fill="hsl(var(--accent))">
          <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* Head */}
        <rect
          x="15"
          y="22"
          width="60"
          height="48"
          rx="10"
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Eye sockets */}
        <circle cx="32" cy="45" r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <circle cx="58" cy="45" r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />

        {/* Pupils — follow cursor */}
        <circle cx={32 + eyeX} cy={45 + eyeY} r="3.5" fill="hsl(var(--accent))" />
        <circle cx={58 + eyeX} cy={45 + eyeY} r="3.5" fill="hsl(var(--accent))" />

        {/* Smile */}
        <path
          d="M 32 60 Q 45 67 58 60"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Body */}
        <rect
          x="22"
          y="72"
          width="46"
          height="30"
          rx="6"
          fill="hsl(var(--primary))"
          opacity="0.9"
        />
        <circle cx="35" cy="87" r="2.5" fill="hsl(var(--accent))" />
        <circle cx="45" cy="87" r="2.5" fill="hsl(var(--accent))" />
        <circle cx="55" cy="87" r="2.5" fill="hsl(var(--accent))" />

        {/* Arms */}
        <rect x="8" y="76" width="12" height="6" rx="3" fill="hsl(var(--primary))" />
        <rect x="70" y="76" width="12" height="6" rx="3" fill="hsl(var(--primary))" />
      </svg>
    </div>
  );
};

export default CursorRobot;
