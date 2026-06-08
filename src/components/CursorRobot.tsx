import { useEffect, useMemo, useRef, useState } from "react";
import robotImg from "@/assets/robot-humanoid.png";

type Props = {
  side: "left" | "right";
};

/**
 * Photorealistic humanoid robot that reacts to the cursor independently.
 * Each robot has its own easing speed, idle rhythm, reaction lag and blink
 * timing so the two never move in lockstep.
 */
const CursorRobot = ({ side }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const [smooth, setSmooth] = useState({ x: 0, y: 0 });
  const [idle, setIdle] = useState({ x: 0, y: 0, breath: 0 });
  const [blink, setBlink] = useState(false);

  // Per-instance "personality" — different easing, phase, sensitivity
  const personality = useMemo(() => {
    const isLeft = side === "left";
    return {
      // how fast the head catches up to the cursor (lower = more lag)
      lerp: isLeft ? 0.07 : 0.045,
      // idle sway frequencies & phase offsets (rad)
      swayFreq: isLeft ? 0.6 : 0.85,
      bobFreq: isLeft ? 1.0 : 1.3,
      breathFreq: isLeft ? 0.9 : 1.15,
      phase: isLeft ? 0 : Math.PI / 1.7,
      // tilt sensitivity divisor (higher = more subtle)
      tiltDiv: isLeft ? 95 : 110,
      tiltMax: isLeft ? 7 : 6,
      swayAmp: isLeft ? 1.2 : 1.5,
      bobAmp: isLeft ? 0.7 : 1.0,
    };
  }, [side]);

  // Track cursor
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Smooth follow with per-robot easing
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 3;
        const dx = targetRef.current.x - cx;
        const dy = targetRef.current.y - cy;
        setSmooth((prev) => ({
          x: prev.x + (dx - prev.x) * personality.lerp,
          y: prev.y + (dy - prev.y) * personality.lerp,
        }));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [personality.lerp]);

  // Idle micro-movement — unique phase per robot
  useEffect(() => {
    let raf = 0;
    const start = performance.now() + Math.random() * 1000;
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      setIdle({
        x: Math.sin(t * personality.swayFreq + personality.phase) * personality.swayAmp,
        y: Math.sin(t * personality.bobFreq + personality.phase * 1.3) * personality.bobAmp,
        breath: Math.sin(t * personality.breathFreq + personality.phase) * 0.5,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [personality]);

  // Random blink — independent per robot
  useEffect(() => {
    let timeout: number;
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 4500;
      timeout = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 110 + Math.random() * 80);
        // occasional double-blink
        if (Math.random() < 0.25) {
          window.setTimeout(() => setBlink(true), 260);
          window.setTimeout(() => setBlink(false), 380);
        }
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => window.clearTimeout(timeout);
  }, []);

  const tilt =
    Math.max(-personality.tiltMax, Math.min(personality.tiltMax, smooth.x / personality.tiltDiv)) +
    idle.x * 0.35;
  const headX = Math.max(-5, Math.min(5, smooth.x / 140)) + idle.x;
  const headY = Math.max(-3, Math.min(3, smooth.y / 190)) + idle.y;

  return (
    <div
      ref={ref}
      className={`hidden md:block pointer-events-none absolute bottom-0 ${
        side === "left" ? "left-0 lg:left-4 xl:left-8" : "right-0 lg:right-4 xl:right-8"
      } z-0 w-[140px] md:w-[170px] lg:w-[230px] xl:w-[290px] opacity-80 md:opacity-100`}
      style={{
        transform: `${side === "right" ? "scaleX(-1) " : ""}rotate(${tilt}deg) translate(${headX}px, ${
          headY + idle.breath
        }px)`,
        transformOrigin: "bottom center",
        transition: "transform 0.12s ease-out",
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.35))",
      }}
      aria-hidden="true"
    >
      <div className="relative">
        <img
          src={robotImg}
          alt=""
          className="w-full h-auto select-none"
          draggable={false}
        />
        <span
          className="absolute bg-black/85 rounded-full"
          style={{
            top: "21%",
            left: "33%",
            width: "9%",
            height: blink ? "3%" : "0%",
            transition: "height 70ms ease-in-out",
          }}
        />
        <span
          className="absolute bg-black/85 rounded-full"
          style={{
            top: "21%",
            left: "57%",
            width: "9%",
            height: blink ? "3%" : "0%",
            transition: "height 70ms ease-in-out",
          }}
        />
      </div>
    </div>
  );
};

export default CursorRobot;
