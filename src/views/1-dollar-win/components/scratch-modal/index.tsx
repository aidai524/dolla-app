import Modal from "@/components/modal";
import clsx from "clsx";
import Card from "../card";
import WinnerBg from "../winner-content/bg";
import Confetti from "@/components/confetti";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/button";

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let x = 0,
  i = 0;

const img = new Image();
img.src = "/1-dollar-win/scratch-card.png";

export default function ScratchModal({
  data,
  open,
  isWinner,
  onClose
}: {
  data: any;
  open: boolean;
  isWinner: boolean;
  onClose: () => void;
}) {
  const canvasFgRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onScratch = () => {
    if (!canvasFgRef.current) return;
    const canvas = canvasFgRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const radius = 280 / 5;

    ctx.beginPath();
    x += rand(2, 3); // Reduced speed by halving the increment
    ctx.ellipse(
      x,
      250 + rand(-80, 80),
      (radius * rand(1, 5)) / 10,
      (radius * rand(10, 20)) / 5,
      (rand(15, 30) * Math.PI) / 180,
      0,
      2 * Math.PI
    );
    ctx.fill();

    if (i++ < 150) requestAnimationFrame(onScratch); // Doubled the iterations
    if (i > 120) {
      // Adjusted threshold proportionally
      canvas.style.opacity = "0";
      isWinner ? setShowSuccess(true) : setShowError(true);
    }
  };

  const initFg = () => {
    if (!canvasFgRef.current) return;
    const canvas = canvasFgRef.current;
    const ctx = canvas.getContext("2d");
    setIsReady(false);
    setShowError(false);
    setShowSuccess(false);
    if (ctx) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "destination-out";
      x = 0;
      i = 0;
      setTimeout(() => {
        setIsReady(true);
        onScratch();
      }, 100);
    }
  };

  useEffect(() => {
    if (open) {
      initFg();
    }
  }, [open]);
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="w-[349px] h-[512px] relative">
          <div className="absolute w-full h-full z-[3]">
            <canvas
              ref={canvasFgRef}
              className="absolute top-0 left-0 z-[4] w-full h-full rounded-[14px]"
            />
            {isReady &&
              (!isWinner ? (
                <img
                  src="/1-dollar-win/scratch-card-bg.png"
                  className={clsx(
                    "absolute top-[-4px] left-0 w-[359px] h-[522px] object-cover rounded-[24px]"
                  )}
                  loading="eager"
                  fetchPriority="high"
                />
              ) : (
                <Card
                  data={{ ...data, type: "basic" }}
                  from="detail"
                  className="absolute top-0 left-0"
                />
              ))}
          </div>
          {showSuccess && isWinner && (
            <>
              <WinnerBg className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
              <img
                src="/1-dollar-win/you-won.png"
                className="absolute top-[-50px] left-[-40px] w-[240px] h-[166px] z-[20]"
              />
              <div className="absolute bottom-[-60px] left-[50%] translate-x-[-50%] z-[2] text-white">
                <div className="flex items-center justify-center gap-[10px] text-[14px] font-semibold mt-[10px]">
                  <button
                    className="button w-[143px] h-[40px] rounded-[20px] bg-[#434343] text-white button"
                    onClick={() => {
                      setShowSuccess(false);
                      onClose();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
              <Confetti />
            </>
          )}
        </div>
      </Modal>
      <Modal open={showError && !isWinner} onClose={() => {}}>
        <div className="w-[284px] h-[259px] rounded-[10px] bg-[#141519] border border-[#373737] flex flex-col items-center justify-center text-[#999999]">
          <div className="text-[20px] font-semibold">Sorry!</div>
          <div className="text-[14px] mt-[10px] text-center px-[30px]">
            Non-winning this round Good Luck next time!
          </div>
          <Button
            onClick={() => {
              setShowError(false);
              onClose();
            }}
            className="mt-[20px] cursor-pointer duration-300 w-[160px] h-[50px] rounded-[10px] bg-[#EBFF57] hover:shadow-[0px_0px_10px_0px_rgba(235,255,87,0.60)] text-[14px] text-black font-medium"
          >
            Restart
          </Button>
        </div>
      </Modal>
    </>
  );
}
