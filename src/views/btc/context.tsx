import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import usePoolRecommend from "@/hooks/use-pool-recommend";
import useBasicInfo from "@/hooks/solana/use-basic";

export const CannonCoinsContext = createContext<any>({});

export const CannonCoinsProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [flipStatus, setFlipStatus] = useState(0); // 0: not flipping, 1: bidding, 2: bid success, 3: waiting, 4: bid complete, 5: auto flipping, 6: complete
  const [bids, setBids] = useState(1);
  const { sbProgramRef } = useBasicInfo();
  const coinsRef = useRef<any>({});
  const flipedNumberRef = useRef(0);
  const [bidResult, setBidResult] = useState<any>(null);
  const [showTicket, setShowTicket] = useState(false);

  const { data } = usePoolRecommend(0);
  const [selectedMarket, setSelectedMarket] = useState<any>(null);
  const pool = useMemo(() => {
    return selectedMarket || data;
  }, [selectedMarket, data]);

  useEffect(() => {
    if (flipStatus === 1 || flipStatus === 0) {
      flipedNumberRef.current = 0;
    }
    if (flipStatus === 2) {
      for (let i = 0; i < bids; i++) {
        coinsRef.current[i].collect();
      }
      setTimeout(() => {
        setFlipStatus(3);
      }, 600);
    }

    if (flipStatus === 4) {
      for (let i = 0; i < bids; i++) {
        coinsRef.current[i].revert();
      }
    }

    if (flipStatus === 5) {
      coinsRef.current[0].flip();
    }
  }, [flipStatus]);

  return (
    <CannonCoinsContext.Provider
      value={{
        flipStatus,
        pool,
        sbProgramRef,
        bids,
        setBids,
        setFlipStatus,
        coinsRef,
        bidResult,
        showTicket,
        setShowTicket,
        setBidResult,
        flipComplete: (index: number) => {
          flipedNumberRef.current++;
          if (flipedNumberRef.current === bids) {
            setFlipStatus(flipStatus !== 6 ? 6 : 0);
            flipedNumberRef.current = 0;
            return;
          }
          if (flipStatus === 5 && index < bids - 1) {
            coinsRef.current[index + 1].flip();
          }
        },
        onReset: () => {
          flipedNumberRef.current = 0;
          for (let i = 0; i < bids; i++) {
            coinsRef.current[i].flip(true);
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
