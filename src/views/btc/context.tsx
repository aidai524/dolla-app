import { createContext, useContext, useRef, useState } from "react";

export const CannonCoinsContext = createContext<{
  manualFlip: () => void;
  isFlipping: boolean;
  coinsRef: React.RefObject<any[]>;
  flipComplete: (index: number) => void;
  flipResults: string[];
  getFlipResult: (index: number) => "heads" | "tails";
  updateCoinFlipResult: (index: number, result: "heads" | "tails") => void;
}>({
  manualFlip: () => {},
  isFlipping: false,
  coinsRef: { current: [] },
  flipComplete: () => {},
  flipResults: [],
  getFlipResult: () => "heads",
  updateCoinFlipResult: () => {}
});

export const CannonCoinsProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const flipNumberRef = useRef(0);
  const coinsRef = useRef<any[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const coinFlipInProgressRef = useRef<{ [key: number]: boolean }>({});
  const [flipResults, setFlipResults] = useState<("heads" | "tails")[]>([
    "heads",
    "heads",
    "heads",
    "heads",
    "heads"
  ]);

  const updateCoinFlipResult = (index: number, result: "heads" | "tails") => {
    // Update the flip result for a specific coin during the flip animation
    const coinRef = coinsRef.current[index];
    if (coinRef && typeof coinRef.updateFlipResult === "function") {
      coinRef.updateFlipResult(result);
    }
  };

  return (
    <CannonCoinsContext.Provider
      value={{
        manualFlip: () => {
          flipNumberRef.current = 0;
          setTimeout(() => {
            updateCoinFlipResult(0, "tails");
            updateCoinFlipResult(1, "tails");
          }, 1500);
          setIsFlipping(true);
          coinsRef.current?.forEach((coinRef: any, index: number) => {
            if (coinRef && typeof coinRef.flipCoin === "function") {
              coinRef.flipCoin(flipResults[index]);
              coinFlipInProgressRef.current[index] = false;
            }
          });
        },
        isFlipping,
        coinsRef,
        flipResults,
        flipComplete: (coin: any) => {
          flipNumberRef.current++;

          coinFlipInProgressRef.current[coin.key] = true;
          if (flipNumberRef.current === coinsRef.current.length) {
            setIsFlipping(false);
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
            return;
          }
          if (flipNumberRef.current === 4) {
            timerRef.current = setTimeout(() => {
              coinsRef.current.forEach((coinRef: any, index: number) => {
                if (!coinFlipInProgressRef.current[index]) {
                  coinRef.forceStop();
                }
              });
            }, 1000);
          }
        },
        getFlipResult: (index: number) => {
          return flipResults[index];
        },
        updateCoinFlipResult
      }}
    >
      {children}
    </CannonCoinsContext.Provider>
  );
};

export const useBtcContext = () => {
  return useContext(CannonCoinsContext);
};
