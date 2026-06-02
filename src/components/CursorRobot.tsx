import { useEffect, useRef, useState } from "react";

type Props = {
  side: "left" | "right";
};

/**
 * Large humanoid robot whose head/eyes follow the cursor.
 * Positioned absolutely; meant to be placed inside a relative hero container.
 */
const CursorRobot = ({ side }: Props) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const cx =
    containerRef.current && containerRef.current.parentElement
      ? containerRef.current.parentElement.getBoundingClientRect().left +
        containerRef.current.parentElement.getBoundingClientRect().width *
          (side === "left" ? 0.12 : 0.88)
      : side === "left"
        ? window.innerWidth * 0.12
        : window.innerWidth * 0.88;
  const cy =
    containerRef.current && containerRef.current.parentElement
      ? containerRef.current.parentElement.getBoundingClientRect().top +
        containerRef.current.parentElement.getBoundingClientRect().height * 0.5
      : window.innerHeight * 0.5;

  const dx = pos.x - cx;
  const dy = pos.y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const maxOffset = 6;
  const eyeX = (dx / dist) * Math.min(maxOffset, dist / 30);
  const eyeY = (dy / dist) * Math.min(maxOffset, dist / 30);
  const tilt = Math.max(-10, Math.min(10, dx / 60));

  const w = 220;
  const h = 320;

  return (
    <div
      ref={containerRef}
      className={`hidden lg:flex pointer-events-none absolute bottom-0 ${
        side === "left" ? "left-0 xl:-left-4" : "right-0 xl:-right-4"
      } z-20`}
      aria-hidden="true"
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ transform: `rotate(${tilt}deg)`, transition: "transform 0.15s ease-out" }}
      >
        {/* Antenna */}
        <line x1={w / 2} y1={10} x2={w / 2} y2={32} stroke="hsl(var(--accent))" strokeWidth="3" />
        <circle cx={w / 2} cy={8} r={7} fill="hsl(var(--accent))">
          <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* Head */}
        <rect
          x={w / 2 - 60}
          y={32}
          width={120}
          height={110}
          rx={18}
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
        />

        {/* Neck */}
        <rect
          x={w / 2 - 20}
          y={142}
          width={40}
          height={24}
          rx={6}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Eye sockets */}
        <circle cx={w / 2 - 24} cy={82} r={18} fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx={w / 2 + 24} cy={82} r={18} fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Pupils — follow cursor */}
        <circle cx={w / 2 - 24 + eyeX} cy={82 + eyeY} r={8} fill="hsl(var(--accent))" />
        <circle cx={w / 2 + 24 + eyeX} cy={82 + eyeY} r={8} fill="hsl(var(--accent))" />

        {/* Smile */}
        <path
          d={`M ${w / 2 - 30} 120 Q ${w / 2} 138 ${w / 2 + 30} 120`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Torso */}
        <rect
          x={w / 2 - 55}
          y={166}
          width={110}
          height={80}
          rx={14}
          fill="hsl(var(--primary))"
          opacity="0.9"
        />
        {/* Chest detail */}
        <rect
          x={w / 2 - 30}
          y={182}
          width={60}
          height={48}
          rx={8}
          fill="hsl(var(--background))"
          opacity="0.5"
        />
        <circle cx={w / 2 - 12} cy={206} r={5} fill="hsl(var(--accent))" />
        <circle cx={w / 2 + 12} cy={206} r={5} fill="hsl(var(--accent))" />

        {/* Arms */}
        <rect
          x={w / 2 - 78}
          y={174}
          width={20}
          height={60}
          rx={10}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        <rect
          x={w / 2 + 58}
          y={174}
          width={20}
          height={60}
          rx={10}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Shoulders */}
        <circle cx={w / 2 - 68} cy={178} r={14} fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx={w / 2 + 68} cy={178} r={14} fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default CursorRobot;
