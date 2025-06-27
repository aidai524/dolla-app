import CloseIcon from "@/components/icons/close";
import useOrder from "../hooks/use-order";
import useData from "../hooks/use-data";
import Loading from "@/components/icons/loading";
import ButtonWithAuth from "@/components/button/button-with-auth";
import { useMemo } from "react";

export default function PlaceBet() {
  const { currentGame } = useData();
  const { onOrder, loading, quantity, setQuantity } = useOrder({
    gameId: currentGame?.id
  });

  const maxShares = useMemo(() => {
    if (!currentGame) return 0;

    return currentGame?.total_shares - currentGame?.sold_shares;
  }, [currentGame]);

  const sharesSplit = useMemo(() => {
    if (!maxShares || maxShares === 1) return [];
    let splits = [];
    if (maxShares > 5) {
      splits.push(1);
      // splits.push(5);
    }
    if (maxShares > 10) {
      splits.push(10);
    }
    // if (maxShares > 20) {
    //   splits.push(20);
    // }
    // if (maxShares > 50) {
    //   splits.push(50);
    // }
    if (maxShares > 100) {
      splits.push(100);
    }
    return splits;
  }, [maxShares]);

  const errorTips = useMemo(() => {
    if (!quantity) {
      return "Enter a quantity";
    }

    if (quantity > maxShares) {
      return "Greater than max shares";
    }
    return false;
  }, [quantity, maxShares]);

  return (
    <div className="flex items-center justify-between mt-[28px] px-[40px]">
      <div className="flex items-center gap-2">
        <div className="flex h-[36px] w-[244px] items-center justify-center rounded-full bg-[#191817] border border-[#434343CC] p-[6px]">
          <img
            className="w-[24px] h-[24px] rounded-full shrink-0"
            src={currentGame?.currencyIcon}
          />
          <input
            value={quantity}
            defaultValue=""
            onChange={(e) => {
              if (!e.target.value) {
                setQuantity("");
              } else if (!isNaN(Number(e.target.value))) {
                setQuantity(Number(e.target.value));
              }
            }}
            className="px-[10px] text-[14px] text-white w-[calc(100%-24px)]"
          />
          {!!quantity && quantity > 0 && (
            <button
              className="button shrink-0"
              onClick={() => {
                setQuantity("");
              }}
            >
              <CloseIcon />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          {sharesSplit.map((item) => (
            <button
              className="button flex h-[36px] items-center justify-center rounded-[20px] bg-[#191817] border border-[#434343CC] text-[14px] text-white px-[14px]"
              key={item}
              onClick={() => {
                setQuantity(item);
              }}
            >
              ×{item}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-[12px] text-[#ABABAB] mr-[10px] font-light">
          Bal. -
        </span>
        <ButtonWithAuth
          disabled={loading || !!errorTips}
          className="cursor-pointer duration-300 rounded-full bg-[#EBFF57] min-w-[100px] flex items-center justify-center px-[10px] h-[40px] font-medium text-black text-[14px] hover:shadow-[0px_0px_10px_0px_rgba(235,255,87,0.60)]"
          onClick={onOrder}
        >
          {loading ? <Loading size={20} /> : errorTips || "Place Bet"}
        </ButtonWithAuth>
      </div>
    </div>
  );
}
