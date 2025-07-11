import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState
} from "react";

export const CannonCoinsContext = createContext<{
  manualFlip: () => void;
  isFlipping: boolean;
  coinsRef: React.RefObject<any[]>;
  flipComplete: () => void;
}>({
  manualFlip: () => {},
  isFlipping: false,
  coinsRef: { current: [] },
  flipComplete: () => {}
});

export const CannonCoinsProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const flipNumberRef = useRef(0);
  const coinsRef = useRef<any[]>([]);

  return (
    <CannonCoinsContext.Provider
      value={{
        manualFlip: () => {
          flipNumberRef.current = 0;
          console.log("isFlipping", isFlipping);
          setIsFlipping(true);
          coinsRef.current?.forEach((coinRef: any) => {
            if (coinRef && typeof coinRef.flipCoin === "function") {
              coinRef.flipCoin();
            }
          });
        },
        isFlipping,
        coinsRef,
        flipComplete: () => {
          flipNumberRef.current++;

          if (flipNumberRef.current === coinsRef.current.length) {
            setIsFlipping(false);
          }
        }
      }}
    >
      {children}
    </CannonCoinsContext.Provider>
  );
};

export const useBtcContext = () => {
  return useContext(CannonCoinsContext);
};
