import Player from "./player";
import { useState, useRef, useEffect } from "react";
import TriIcon from "./tri-icon";

const len = 20;

export default function TopPlayers() {
  const [currentIndex] = useState(10);
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reelRef.current) return;
  }, []);

  return (
    <div className="relative h-[220px] px-[40px] flex items-center justify-center overflow-hidden">
      <div className="w-full h-full pointer-events-none absolute top-0 left-0 bg-gradient-to-r from-[#000] via-transparent to-[#000] z-10" />
      <div
        className="flex items-center justify-center relative h-full will-change-transform transfrom-origin-center preserve-3d gap-[16px]"
        ref={reelRef}
      >
        {Array.from({ length: len }, (_, i) => i).map((item, index) =>
          index < 3 ? (
            index + 3 >= len || index < 3
          ) : Math.abs(currentIndex - index) > 3 ? (
            <div key={index} />
          ) : (
            <div
              key={index}
              className="absolute inset-x-0 mx-auto -mt-1 backface-hidden preserve-3d"
              style={{
                transform: `10deg`
              }}
            >
              <Player key={item} active={index === currentIndex} item={item} />
            </div>
          )
        )}
      </div>
      <TriIcon className="absolute left-[50%] translate-x-[-50%] top-[10px]" />
      <TriIcon className="absolute left-[50%] translate-x-[-50%] bottom-[10px] rotate-180" />
    </div>
  );
}
