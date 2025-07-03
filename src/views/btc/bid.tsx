import BidCom from "@/components/bid";
import { useState } from "react";
import useBid from "@/hooks/solana/use-bid";
import ButtonWithAuth from "@/components/button/button-with-auth";
import useTokenBalance from "@/hooks/solana/use-token-balance";
import { QUOTE_TOKEN } from "@/config/btc";
import Big from "big.js";
import clsx from "clsx";

export default function BTCBid(props: any) {
  const { data, onDrawSuccess, selectedBid } = props;

  const [isWinner, setIsWinner] = useState(false);
  const { tokenBalance, isLoading } = useTokenBalance(QUOTE_TOKEN);

  const isBalanceEnough = Big(tokenBalance || 0).gte(selectedBid);
  const { onBid, bidding } = useBid((isWinner) => {
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
          onBid(data.pool_id, selectedBid);
        }}
        loading={bidding || isLoading}
        disabled={
          true ||
          !isBalanceEnough ||
          isWinner ||
          (!data?.pool_id && data?.pool_id !== 0)
        }
      >
        {isBalanceEnough
          ? isWinner
            ? "WON!"
            : "DOLLA BID!"
          : "Insufficient balance"}
      </ButtonWithAuth>
    </BidCom>
  );
}
