import { useEffect, useRef, useState } from "react";
import robotImg from "@/assets/robot-humanoid.png";

type Props = {
  side: "left" | "right";
};

/**
 * Photorealistic humanoid robot that tilts/leans toward the cursor.
 */
const CursorRobot = ({ side }: Props) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const rect = ref.current?.getBoundingClientRect();
  const cx = rect ? rect.left + rect.width / 2 : 0;
  const cy = rect ? rect.top + rect.height / 3 : 0;
  const dx = pos.x - cx;
  const dy = pos.y - cy;
  const tilt = Math.max(-12, Math.min(12, dx / 50));
  const headX = Math.max(-8, Math.min(8, dx / 80));
  const headY = Math.max(-5, Math.min(5, dy / 120));

  return (
    <div
      ref={ref}
      className={`hidden lg:block pointer-events-none absolute bottom-0 ${
        side === "left" ? "left-2 xl:left-8" : "right-2 xl:right-8"
      } z-20 w-[240px] xl:w-[300px]`}
      style={{
        transform: `${side === "right" ? "scaleX(-1) " : ""}rotate(${
          side === "right" ? -tilt : tilt
        }deg) translate(${headX}px, ${headY}px)`,
        transformOrigin: "bottom center",
        transition: "transform 0.2s ease-out",
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.35))",
      }}
      aria-hidden="true"
    >
      <img
        src={robotImg}
        alt=""
        className="w-full h-auto select-none"
        draggable={false}
      />
    </div>
  );
};

export default CursorRobot;
