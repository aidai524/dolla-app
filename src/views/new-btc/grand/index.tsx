import clsx from "clsx";
import Bg from "./bg";
import { useEffect, useRef } from "react";
import Amount from "./amount";
import Provider from "./provider";
import "./index.css";

export default function Grand({ className }: { className?: string }) {
  const contentRef = useRef<HTMLDivElement>(null);

  const updateContentPosition = () => {
    const bg = document.getElementById("grand-bg");
    const rect = bg?.getBoundingClientRect();

    if (contentRef.current && rect?.top && rect?.height) {
      const top = rect.top + rect.height * 0.06;
      contentRef.current.style.top = `${top}px`;
      contentRef.current.style.width = `${rect.width}px`;
      contentRef.current.style.height = `${rect.height * 0.9}px`;
    }
  };

  useEffect(() => {
    // Initial position update
    updateContentPosition();

    // Add resize event listener
    const handleResize = () => {
      updateContentPosition();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={clsx("mx-auto relative max-w-[1200px]", className)}>
      <Bg className="absolute top-0 left-0" />
      <div
        className={clsx(
          "absolute left-[50%] translate-x-[-50%]",
          "grand-content"
        )}
        ref={contentRef}
      >
        <Amount />
        <Provider />
      </div>
    </div>
  );
}
