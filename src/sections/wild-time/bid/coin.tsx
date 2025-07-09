import { useState, useImperativeHandle, forwardRef } from "react";
import clsx from "clsx";

interface CoinProps {
  className?: string;
  onFlipComplete?: (result: "heads" | "tails") => void;
  disabled?: boolean;
  size?: number;
}

const Coin = forwardRef<any, CoinProps>(
  ({ onFlipComplete, disabled, size = 80 }, ref) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const onFlip = () => {
      if (disabled || isAnimating) return;

      setIsAnimating(true);
      setIsFlipped(!isFlipped);

      // Trigger callback after animation
      setTimeout(() => {
        setIsAnimating(false);
        if (onFlipComplete) {
          onFlipComplete(isFlipped ? "heads" : "tails");
        }
      }, 1000);
    };

    useImperativeHandle(ref, () => ({
      flip: onFlip
    }));

    const thickness = Math.max(8, size * 0.1);

    return (
      <div
        className={clsx(
          "relative cursor-pointer perspective-[1000px]",
          disabled && "grayscale"
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`
        }}
        onClick={onFlip}
      >
        <div
          className="relative w-full h-full transition-transform duration-1000 ease-in-out preserve-3d"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Front face (Heads) */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-full backface-hidden"
            style={{
              backgroundImage: "url('/new-btc/coins/dolla-s.png')",
              transform: `translateZ(${thickness}px)`
            }}
          />

          {/* Back face (Tails) */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-full backface-hidden"
            style={{
              backgroundImage: "url('/new-btc/coins/dolla-eth.png')",
              transform: `rotateY(180deg) translateZ(${thickness}px)`
            }}
          />

          {/* Coin edges container */}
          <div className="absolute top-0 left-0 w-full h-full preserve-3d">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
              <div
                key={index}
                className="absolute top-0 left-0 w-full h-full rounded-full backface-hidden"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${
                    thickness / 2
                  }px)`,
                  background: "#6D5F51",
                  border: "2px solid #6D5F51"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default Coin;
