import { useState, useImperativeHandle, forwardRef } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface CoinProps {
  className?: string;
  onFlipComplete?: (result: "heads" | "tails") => void;
  disabled?: boolean;
  size?: number;
}

const Coin = forwardRef<any, CoinProps>(
  ({ onFlipComplete, disabled, size = 200 }, ref) => {
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
      }, 600); // Reduced from 1000ms to 600ms to start exit animation earlier
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
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                rotate: 360,
                scale: 1
              }}
              exit={{ opacity: 0, scale: 0.2 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut"
              }}
              className="w-[434px] h-[434px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[url('/new-btc/wild-flip.png')] bg-cover bg-center pointer-events-none"
            />
          )}
        </AnimatePresence>
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
              backgroundImage: "url('/new-btc/wild.png')",
              transform: `translateZ(${thickness}px)`
            }}
          />

          {/* Back face (Tails) */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-full backface-hidden"
            style={{
              backgroundImage: "url('/new-btc/coins/dolla-s.png')",
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
