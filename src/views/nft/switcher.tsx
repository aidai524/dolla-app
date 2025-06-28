import { motion } from "framer-motion";

export default function Switcher({ onClick }: { onClick: () => void }) {
  return (
    <div className="group absolute z-[100] bottom-[160px] right-[20px] w-[62px] h-[109px] bg-[url('/switcher-bottom.png')] bg-no-repeat bg-center bg-cover">
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
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[20px] left-[-180px] h-[40px] bg-[#131313] border border-[#484848] px-[11px] pt-[6px] rounded-[6px] pointer-events-none">
        <div className="text-[#ADBCCF] text-[14px] whitespace-nowrap">
          Change an other NFT
        </div>
        <div className="absolute right-[-6px] top-[50%] translate-y-[-50%] w-[12px] h-[12px] bg-[#131313] border border-transparent border-b-[#484848] border-r-[#484848] rounded-[2px] rotate-[-45deg]"></div>
      </div>
    </div>
  );
}
