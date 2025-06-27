import { motion } from "framer-motion";

export default function Switcher({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute z-[100] bottom-[160px] right-[20px] w-[62px] h-[109px] bg-[url('/switcher-bottom.png')] bg-no-repeat bg-center bg-cover">
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
        className="absolute button top-[-24px] left-[0px] w-[62px] h-[89px] bg-[url('/switcher-controller.png')] bg-no-repeat bg-center bg-cover cursor-pointer"
      />
    </div>
  );
}
