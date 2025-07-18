import { useState } from "react";
import "./coin.less";

export default function Coin() {
  const [isFlipped, setIsFlipped] = useState(false);

  const onFlip = (e: any) => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="coin"
      style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      onClick={onFlip}
    >
      <div className="front"></div>
      <div className="back"></div>
      <div className="side">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="spoke"></div>
        ))}
      </div>
    </div>
  );
}
