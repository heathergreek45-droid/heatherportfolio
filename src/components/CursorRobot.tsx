import { useEffect, useRef, useState } from "react";
import robotImg from "@/assets/robot-humanoid.png";

type Props = {
  side: "left" | "right";
};

/**
 * Photorealistic humanoid robot that tilts/leans toward the cursor.
 * Includes idle breathing, subtle head micro-movements, and eye blinks.
 */
const CursorRobot = ({ side }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const [smooth, setSmooth] = useState({ x: 0, y: 0 });
  const [idle, setIdle] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  // Track cursor
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Smooth follow with easing (lerp) for natural tilt
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
          x: prev.x + (dx - prev.x) * 0.08,
          y: prev.y + (dy - prev.y) * 0.08,
        }));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Idle micro-movement (breathing / sway)
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      setIdle({
        x: Math.sin(t * 0.7) * 1.2,
        y: Math.sin(t * 1.1) * 0.8,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Random blink (every 3-6s)
  useEffect(() => {
    let timeout: number;
    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 3000;
      timeout = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => window.clearTimeout(timeout);
  }, []);

  // Reduced sensitivity for natural feel
  const tilt = Math.max(-7, Math.min(7, smooth.x / 90)) + idle.x * 0.4;
  const headX = Math.max(-5, Math.min(5, smooth.x / 130)) + idle.x;
  const headY = Math.max(-3, Math.min(3, smooth.y / 180)) + idle.y;

  return (
    <div
      ref={ref}
      className={`hidden md:block pointer-events-none absolute bottom-0 ${
        side === "left" ? "left-0 lg:left-4 xl:left-8" : "right-0 lg:right-4 xl:right-8"
      } z-0 w-[140px] md:w-[170px] lg:w-[230px] xl:w-[290px] opacity-80 md:opacity-100`}
      style={{
        transform: `${side === "right" ? "scaleX(-1) " : ""}rotate(${
          side === "right" ? -tilt : tilt
        }deg) translate(${headX}px, ${headY}px)`,
        transformOrigin: "bottom center",
        transition: "transform 0.15s ease-out",
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
        {/* Eye-blink overlays — adjust top/left % to match robot eyes in the image */}
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
