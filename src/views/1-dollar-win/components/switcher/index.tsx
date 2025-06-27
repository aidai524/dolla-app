import { motion } from "framer-motion";
import NewHints from "./new-hints";

export default function Switcher({
  onClick,
  newHints
}: {
  onClick: () => void;
  newHints: number;
}) {
  return (
    <div className="fixed z-[100] bottom-[20px] right-[8px] w-[48px] h-[86px] bg-[url('/1-dollar-win/switcher-bottom.png')] bg-no-repeat bg-center bg-cover">
      <motion.div
        initial={{
          y: 0,
          rotateZ: 0
        }}
        style={{
          transformOrigin: "bottom center"
        }}
        onClick={() => {
          // window.howl.switcher.play();
          // Play animation on click
          const element = document.getElementById("switcher-controller");
          if (element) {
            element.animate(
              [
                { transform: "rotateZ(0deg)" },
                { transform: "rotateZ(-60deg)" },
                { transform: "rotateZ(0deg)" }
              ],
              {
                duration: 800,
                easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                fill: "forwards"
              }
            );
          }

          onClick?.();
        }}
        id="switcher-controller"
        className="absolute button top-[-18px] left-[5px] w-[40px] h-[66px] bg-[url('/1-dollar-win/switcher-controller.png')] bg-no-repeat bg-center bg-cover cursor-pointer"
      />
      {!!newHints && <NewHints num={newHints} />}
    </div>
  );
}
