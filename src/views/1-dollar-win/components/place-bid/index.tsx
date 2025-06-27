import CloseIcon from "@/components/icons/close";
import useDrawOrder from "../../hooks/use-draw-order";
import Loading from "@/components/icons/loading";
import ButtonWithAuth from "@/components/button/button-with-auth";
import { useMemo } from "react";
// import LoseModal from "../scratch-modal";
import ScratchModal from "../scratch-modal";
import { formatNumber } from "@/utils/format/number";

const COLORS = ["#ABABAB", "#5CC3A4", "#FFCD71", "#FF60A8"];

export default function PlaceBet({ data, onSuccess }: any) {
  const {
    probability,
    probabilityLoading,
    fetchDrawProbability,
    drawOrderLoading,
    placeOrder,
    quantity,
    setQuantity,
    bidResult,
    setBidResult,
    getProbability
  } = useDrawOrder(data);

  const errorTips = useMemo(() => {
    if (data.status !== "active") {
      return "The draw is not active";
    }

    if (!quantity) {
      return "Enter a quantity";
    }

    fetchDrawProbability();
    return false;
  }, [quantity, data]);

  return (
    <div className="mt-[14px]">
      <div className="flex h-[52px] w-full items-center justify-center rounded-[10px] bg-[#191817] border border-[#434343CC] p-[12px] duration-300 hover:border-[#EBFF57]">
        <div className="flex items-center gap-[7px]">
          <div className="text-[14px] text-white">Bid</div>
          <img
            className="w-[24px] h-[24px] rounded-full shrink-0"
            src={data?.currencyIcon}
          />
        </div>
        <input
          value={quantity || ""}
          defaultValue=""
          placeholder="0"
          onChange={(e) => {
            if (!e.target.value) {
              setQuantity("");
            } else if (!isNaN(Number(e.target.value))) {
              setQuantity(Number(e.target.value));
            }
          }}
          className="px-[10px] text-[14px] text-white w-[calc(100%-24px)] text-right"
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
      <div className="text-[10px] text-[#ABABAB] mt-[4px] flex items-center gap-[4px] justify-end">
        <span>Probability:</span>
        {probabilityLoading ? (
          <Loading size={10} />
        ) : (
          formatNumber(probability, 2, true) + "%"
        )}
      </div>
      <div className="flex items-center gap-[10px] mt-[16px]">
        {[1, 10, 20, 100].map((item, i) => (
          <button
            className="button duration-300 hover:border-[#EBFF57] flex h-[36px] w-1/4 items-center justify-between rounded-[10px] bg-[#191817] border border-[#434343CC] text-[12px] text-white px-[8px] font-light"
            key={item}
            onClick={() => {
              setQuantity(item);
            }}
          >
            <span>×{item}</span>
            <span style={{ color: COLORS[i] }}>
              {formatNumber(getProbability(item), 2, true)}%
            </span>
          </button>
        ))}
      </div>
      <ButtonWithAuth
        disabled={drawOrderLoading || !!errorTips}
        className="duration-300 rounded-[10px] bg-[#EBFF57] flex items-center justify-center px-[10px] h-[50px] w-full mt-[24px] font-medium text-black text-[14px] hover:shadow-[0px_0px_10px_0px_rgba(235,255,87,0.60)]"
        onClick={placeOrder}
      >
        {drawOrderLoading ? <Loading size={20} /> : errorTips || "Place Bid"}
      </ButtonWithAuth>
      <ScratchModal
        data={data}
        open={!!bidResult}
        isWinner={bidResult?.is_winner}
        onClose={() => {
          setBidResult(null);
          if (bidResult?.is_winner) {
            onSuccess();
          }
        }}
      />
    </div>
  );
}
