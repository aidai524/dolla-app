import BidCom from "@/components/bid";
import ScratchModal from "./scratch-modal";
import { useState } from "react";
import useDraw from "@/hooks/evm/use-draw";
import ButtonWithAuth from "@/components/button/button-with-auth";
import useTokenBalance from "@/hooks/evm/use-token-balance";
import { BETTING_CONTRACT_ADDRESS, PURCHASE_TOKEN } from "@/config";
import Big from "big.js";
import useApprove from "@/hooks/evm/use-approve";
import clsx from "clsx";

export default function NFTBid(props: any) {
  const { data, onDrawSuccess, selectedBid } = props;
  const [showAnimation, setShowAnimation] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
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
  const { onDraw, drawing } = useDraw((isWinner) => {
    setShowAnimation(true);
    setIsWinner(isWinner);
    onDrawSuccess?.();
  });

  return (
    <BidCom {...props}>
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
    </BidCom>
  );
}
