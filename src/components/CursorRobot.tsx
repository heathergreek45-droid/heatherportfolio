import { useEffect, useMemo, useRef, useState } from "react";
import robotImg from "@/assets/robot-humanoid.png";

type Props = {
  side: "left" | "right";
};

/**
 * Photorealistic humanoid robot that reacts to the cursor independently.
 * - Each robot only reacts while the cursor is inside its own attention zone.
 * - Idle sway, breathing, blinks and occasional micro head-gestures vary per robot.
 * - Responsive sizing + collision-aware offsets keep robots clear of hero text.
 */
const CursorRobot = ({ side }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0, active: false });
  const [smooth, setSmooth] = useState({ x: 0, y: 0 });
  const [idle, setIdle] = useState({ x: 0, y: 0, breath: 0 });
  const [gesture, setGesture] = useState({ nod: 0, earTilt: 0 });
  const [blink, setBlink] = useState(false);

  // Per-instance "personality"
  const personality = useMemo(() => {
    const isLeft = side === "left";
    return {
      lerp: isLeft ? 0.07 : 0.045,
      swayFreq: isLeft ? 0.6 : 0.85,
      bobFreq: isLeft ? 1.0 : 1.3,
      breathFreq: isLeft ? 0.9 : 1.15,
      phase: isLeft ? 0 : Math.PI / 1.7,
      tiltDiv: isLeft ? 95 : 110,
      tiltMax: isLeft ? 7 : 6,
      swayAmp: isLeft ? 1.2 : 1.5,
      bobAmp: isLeft ? 0.7 : 1.0,
    };
  }, [side]);

  // Cursor tracking + per-robot attention zone (each robot owns its half +
  // a small overlap band in the middle).
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const mid = window.innerWidth / 2;
      const overlap = 80;
      const inZone =
        side === "left" ? e.clientX < mid + overlap : e.clientX > mid - overlap;
      targetRef.current = { x: e.clientX, y: e.clientY, active: inZone };
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [side]);

  // Smooth follow — when cursor leaves the zone, drift back to neutral
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        let dx = 0;
        let dy = 0;
        if (targetRef.current.active) {
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 3;
          dx = targetRef.current.x - cx;
          dy = targetRef.current.y - cy;
        }
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

  // Idle sway + breathing
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

  // Random blinks
  useEffect(() => {
    let timeout: number;
    const schedule = () => {
      const delay = 2500 + Math.random() * 4500;
      timeout = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 110 + Math.random() * 80);
        if (Math.random() < 0.25) {
          window.setTimeout(() => setBlink(true), 260);
          window.setTimeout(() => setBlink(false), 380);
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => window.clearTimeout(timeout);
  }, []);

  // Occasional micro-gestures: small nods + ear-to-cursor tilts
  useEffect(() => {
    let timeout: number;
    let raf = 0;
    const animateGesture = (
      from: { nod: number; earTilt: number },
      to: { nod: number; earTilt: number },
      duration: number,
      done?: () => void,
    ) => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        // ease in-out
        const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        setGesture({
          nod: from.nod + (to.nod - from.nod) * e,
          earTilt: from.earTilt + (to.earTilt - from.earTilt) * e,
        });
        if (p < 1) raf = requestAnimationFrame(step);
        else done?.();
      };
      raf = requestAnimationFrame(step);
    };

    const schedule = () => {
      const delay = 5000 + Math.random() * 7000;
      timeout = window.setTimeout(() => {
        const pickNod = Math.random() < 0.55;
        const target = pickNod
          ? { nod: 2 + Math.random() * 2, earTilt: 0 }
          : { nod: 0, earTilt: (Math.random() < 0.5 ? -1 : 1) * (3 + Math.random() * 2) };
        animateGesture({ nod: 0, earTilt: 0 }, target, 320, () => {
          window.setTimeout(() => {
            animateGesture(target, { nod: 0, earTilt: 0 }, 500, schedule);
          }, 250 + Math.random() * 400);
        });
      }, delay);
    };
    schedule();
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  const tilt =
    Math.max(-personality.tiltMax, Math.min(personality.tiltMax, smooth.x / personality.tiltDiv)) +
    idle.x * 0.35 +
    gesture.earTilt;
  const headX = Math.max(-5, Math.min(5, smooth.x / 140)) + idle.x;
  const headY = Math.max(-3, Math.min(3, smooth.y / 190)) + idle.y + gesture.nod;

  return (
    <div
      ref={ref}
      className={`hidden md:block pointer-events-none absolute bottom-0 ${
        side === "left"
          ? "left-1 md:left-2 lg:left-4 xl:left-8"
          : "right-1 md:right-2 lg:right-4 xl:right-8"
      } z-0 w-[120px] md:w-[150px] lg:w-[210px] xl:w-[280px] max-w-[22vw] opacity-70 md:opacity-90 lg:opacity-100`}
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
