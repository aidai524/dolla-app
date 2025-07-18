import { useState, useImperativeHandle, forwardRef, useRef } from "react";
import clsx from "clsx";
import { BackPointsFace, FrontFace } from "./faces";
import useUserInfoStore from "@/stores/use-user-info";
import "./index.css";

const Coin = forwardRef<any, any>(
  (
    {
      onFlipComplete,
      disabled,
      size = 62,
      points,
      index,
      coinContainerRef,
      ticket,
      setShowTicket,
      bids
    },
    ref
  ) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const coinRef = useRef<any>(null);
    const userInfoStore: any = useUserInfoStore();

    // Check if element is in viewport
    const isElementInViewport = (element: HTMLElement) => {
      return (
        element.offsetTop <
        coinContainerRef.current?.clientHeight +
          coinContainerRef.current?.scrollTop
      );
    };

    const onFlip = (force = false) => {
      console.log("onFlip", force);
      if ((disabled || isAnimating) && !force) return;
      if (isFlipped && !force) {
        onFlipComplete?.(index);
        return;
      }

      // Only scroll into view if element is not in viewport
      if (coinRef.current && !isElementInViewport(coinRef.current)) {
        coinRef.current.scrollIntoView({ behavior: "smooth" });
      }

      setIsAnimating(true);
      setIsFlipped(!isFlipped);

      if (ticket === "0") {
        setShowTicket(true);
      }
      userInfoStore.set({
        prize: {
          points: Number(userInfoStore.prize.points) + Number(points),
          tickets:
            Number(userInfoStore.prize.tickets) + Number(ticket === "0" ? 1 : 0)
        }
      });
      // Trigger callback after animation
      setTimeout(() => {
        setIsAnimating(false);
        onFlipComplete?.(index);
      }, 600); // Reduced from 1000ms to 600ms to start exit animation earlier
    };

    const onCollect = () => {
      const rect = coinContainerRef.current.getBoundingClientRect();
      const coinRect = coinRef.current.getBoundingClientRect();
      const targetW = rect.width;
      const targetH = rect.height;
      const targetLeft = targetW / 2 - coinRect.x + rect.x;
      const targetTop = targetH / 2 - coinRect.y + rect.y;
      if (bids > 1) {
        coinRef.current.style.transform = `translate(${targetLeft}px, ${targetTop}px)`;
      } else {
        coinRef.current.style.transform = `scale(0)`;
      }

      coinRef.current.style.opacity = "0";
      coinRef.current.style.transition = "all 0.3s ease-in-out";
    };

    const onRevert = () => {
      if (bids > 1) {
        coinRef.current.style.transform = `translate(0, 0)`;
      } else {
        coinRef.current.style.transform = `scale(1)`;
      }
      coinRef.current.style.opacity = "1";
    };

    useImperativeHandle(ref, () => ({
      flip: onFlip,
      collect: onCollect,
      revert: onRevert
    }));

    const thickness = Math.max(8, size * 0.1);
    // const thickness = 0;

    return (
      <div
        className={clsx("relative cursor-pointer perspective-[1000px]")}
        style={{
          width: `${size}px`,
          height: `${size}px`
        }}
        onClick={() => {
          onFlip();
        }}
        ref={coinRef}
      >
        <div
          className="relative w-full h-full transition-transform duration-500 ease-in-out preserve-3d"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Front face (Heads) */}
          <FrontFace size={size} thickness={thickness} />

          {/* Back face (Tails) */}
          <BackPointsFace size={size} thickness={thickness} points={points} />

          {/* Coin edges container */}
          {/* <div
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transform: `translateX(${size * 0.45}px)`
            }}
          >
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="absolute segment"
                style={{
                  width: thickness,
                  height: size,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transform: `rotateY(90deg) rotateX(${(180 / 24) * index}deg)`
                }}
              />
            ))}
          </div> */}
        </div>
      </div>
    );
  }
);

export default Coin;
