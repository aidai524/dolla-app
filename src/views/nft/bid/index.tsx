import { useImperativeHandle, useMemo, useState } from "react";
import ButtonWithAuth from "@/components/button/button-with-auth";
import config from "./config";
import clsx from "clsx";
import useDraw from "@/hooks/use-draw";
import useTokenBalance from "@/hooks/use-token-balance";
import { BETTING_CONTRACT_ADDRESS, PURCHASE_TOKEN } from "@/config";
import Big from "big.js";
import useApprove from "@/hooks/use-approve";
import { formatNumber } from "@/utils/format/number";
import ScratchModal from "../scratch-modal";

function calcProbability(price: number, times: number) {
  return (1 - (1 - (1 / price) * 2) ** times) * 100;
}

export default function NFTBid({
  className,
  data,
  selectedBid,
  setSelectedBid,
  onDrawSuccess
}: {
  className?: string;
  data: any;
  selectedBid: number;
  setSelectedBid: any;
  onDrawSuccess?: () => void;
}) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const { onDraw, drawing } = useDraw((isWinner) => {
    setShowAnimation(true);
    setIsWinner(isWinner);
    onDrawSuccess?.();
  });
  const { tokenBalance, isLoading } = useTokenBalance({
    address: PURCHASE_TOKEN.address,
    decimals: PURCHASE_TOKEN.decimals
  });
  const { approve, approved, approving, checking } = useApprove({
    token: PURCHASE_TOKEN,
    spender: BETTING_CONTRACT_ADDRESS,
    amount: selectedBid?.toString()
  });
  const isBalanceEnough = Big(tokenBalance || 0).gte(selectedBid);
  const probailties = useMemo(() => {
    const anchorPrice = data.anchor_price;
    return config.map((item) => {
      return formatNumber(
        calcProbability(
          anchorPrice,
          item.value + (data?.accumulative_bids || 0)
        ),
        2,
        true
      );
    });
  }, [data]);

  return (
    <div className={clsx("flex items-center justify-center", className)}>
      <div className="flex items-center gap-[8px]">
        {config.map((item, index) => (
          <BidItem
            key={item.value}
            data={item}
            active={item.value === selectedBid}
            onSelect={(val: number) => {
              setSelectedBid(val);
              setSelectedBid?.(val);
            }}
            probability={probailties[index]}
          />
        ))}
      </div>
      <ButtonWithAuth
        className={clsx(
          "ml-[26px] w-[234px] h-[76px] text-black text-[20px] font-bold",
          !isBalanceEnough || isWinner ? "" : "bid-button"
        )}
        onClick={() => {
          if (!approved) {
            approve();
          } else {
            onDraw(data.pool_id, selectedBid);
          }
        }}
        loading={drawing || isLoading || checking || approving}
        disabled={
          !isBalanceEnough ||
          isWinner ||
          (!data?.pool_id && data?.pool_id !== 0)
        }
      >
        {isBalanceEnough
          ? !approved
            ? "Approve"
            : isWinner
            ? "WON!"
            : "DOLLA BID!"
          : "Insufficient balance"}
      </ButtonWithAuth>
      {data.nft_ids && (
        <ScratchModal
          data={data}
          open={showAnimation}
          isWinner={isWinner}
          onClose={() => {
            setShowAnimation(false);
          }}
        />
      )}
    </div>
  );
}

const BidItem = ({ data, active, probability, onSelect }: any) => {
  return (
    <div
      className={clsx(
        "relative rounded-[10px] group pb-[4px] pr-[4px]",
        active ? "" : "border border-[#293442] bg-[#222A35]"
      )}
    >
      <button
        className={clsx(
          "min-w-[152px] h-[36px] rounded-[6px] flex justify-between items-center pl-[16px] pr-[10px] button"
        )}
        style={{
          color: active ? "#000000" : data.color,
          background: active
            ? "radial-gradient(50% 50% at 50% 50%, #FFEF43 0%, #FFC42F 100%)"
            : "#3B4656",
          border: active ? "none" : "1px solid #4B5A6F",
          transform: active ? "translate(3px 3px)" : "none"
        }}
        onClick={() => {
          onSelect(data.value);
        }}
      >
        <span className="text-[16px] font-bold shrink-0">
          BID x{data.value}
        </span>
        <div className="flex items-center gap-[4px] shrink-0">
          {active && (
            <span className="text-[12px] ml-[10px]">{probability}%</span>
          )}
          <div
            className={clsx(
              !active &&
                "transition-transform duration-75 group-hover:scale-120 group-hover:animate-[pulse_0.5s_ease-in-out_infinite]"
            )}
          >
            {data.icon}
          </div>
        </div>
      </button>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-50px] left-[50%] translate-x-[-50%] h-[40px] bg-[#131313] border border-[#484848] px-[11px] pt-[6px] rounded-[6px] pointer-events-none">
        <div className="text-[#ADBCCF] text-[14px] whitespace-nowrap">
          Probability {probability}%
        </div>
        <div className="absolute bottom-[-6px] left-[50%] translate-x-[-50%] w-[12px] h-[12px] bg-[#131313] border border-transparent border-b-[#484848] border-r-[#484848] rounded-[2px] rotate-45"></div>
      </div>
    </div>
  );
};
