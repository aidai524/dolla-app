import clsx from "clsx";
import { useMemo, useState } from "react";
import { CopyBtn, ExitBtn, AddBtn } from "./action-btns";
import Modal from "@/components/modal";
import Recharge from "@/components/cashier/panels/recharge";
import PriceChart from "../nft-create/price-chart";
import { useAuth } from "@/contexts/auth";
import useCopy from "@/hooks/use-copy";
import { BASE_TOKEN } from "@/config/btc";
import useTokenBalance from "@/hooks/solana/use-token-balance";
import { formatNumber } from "@/utils/format/number";
import useTokenPrice from "@/hooks/use-token-price";
import Loading from "@/components/icons/loading";
import Button from "@/components/button";
import useCreate from "@/hooks/solana/use-create";

export default function BTCCreate() {
  const [amount, setAmount] = useState(1);
  const [chargeModalOpen, setChargeModalOpen] = useState(false);
  const { address, logout } = useAuth();
  const { onCopy } = useCopy();
  const { tokenBalance, isLoading, update } = useTokenBalance(BASE_TOKEN);

  const { prices } = useTokenPrice(BASE_TOKEN);

  const pricePerBTC = useMemo(() => {
    if (!prices || prices?.length === 0) return 0;
    const _p = prices[0].last_price;
    return _p;
  }, [prices]);

  const { onCreate, creating } = useCreate({
    amount,
    anchorPrice: amount * pricePerBTC,
    onCreateSuccess: () => {
      update();
    }
  });

  const errorTips = useMemo(() => {
    if (Number(tokenBalance) < amount) {
      return "Insufficient balance";
    }
    return "";
  }, [amount, tokenBalance]);

  return (
    <div className="w-[526px] mx-auto">
      <div className="text-[20px] font-bold text-center py-[30px]">
        Create BTC Market
      </div>
      <div className="flex items-center gap-[8px]">
        <span className="shrink-0 text-[14px] text-[#5E6B7D]">Account</span>
        <div className="grow h-[1px] border-b border-[#5E6B7D]/50 border-dashed" />
        <div className="flex items-center gap-[4px]">
          <span className="text-[14px] mr-[6px]">
            {address ? `${address?.slice(0, 4)}...${address?.slice(-4)}` : "-"}
          </span>
          <CopyBtn
            onClick={async () => {
              onCopy(address);
            }}
          />
          <ExitBtn
            onClick={() => {
              logout();
            }}
          />
        </div>
      </div>
      <div className="flex items-center mt-[20px] gap-[8px]">
        <span className="shrink-0 text-[14px] text-[#5E6B7D]">Balance</span>
        <div className="grow h-[1px] border-b border-[#5E6B7D]/50 border-dashed" />
        <div className="flex items-center gap-[4px]">
          <span className="text-[14px] mr-[6px]">
            {isLoading ? (
              <Loading size={12} />
            ) : (
              `${formatNumber(tokenBalance, 2, true)} BTC`
            )}
          </span>
          <AddBtn
            onClick={() => {
              setChargeModalOpen(true);
            }}
          />
        </div>
      </div>
      <div className="text-[14px] text-[#5E6B7D] mt-[20px]">Amount</div>
      <div className="mt-[6px] flex gap-[10px]">
        {[1, 0.1, 0.01, 0.001].map((item) => (
          <div
            className={clsx(
              "button w-[124px] h-[72px] rounded-[6px] bg-[#191E27] flex flex-col border items-center justify-center",
              amount === item ? "border-[#FFC42F]" : "border-transparent"
            )}
            key={item}
            onClick={() => setAmount(item)}
          >
            <span className={clsx("text-[18px] font-bold text-white")}>
              {item} BTC
            </span>
            <span className="text-[12px] text-[#5E6B7D] mt-[6px]">
              ~${formatNumber(item * pricePerBTC, 0, true)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[14px] w-full bg-[#1A1E24] rounded-[6px] h-[335px] relative mt-[20px]">
        <PriceChart anchorPrice={amount * pricePerBTC} />
      </div>
      {/* <Action
        amount={amount}
        token={BASE_TOKEN}
        address={address}
        anchorPrice={amount * pricePerBTC}
        tokenBalance={tokenBalance}
        onSuccess={() => {
          update();
        }}
      /> */}
      <Button
        disabled={!!errorTips}
        className="mt-[20px] w-full h-[40px]"
        loading={creating}
        onClick={() => {
          if (errorTips) return;
        }}
      >
        {errorTips || "Create Market"}
      </Button>

      <Modal open={chargeModalOpen} onClose={() => setChargeModalOpen(false)}>
        <div className="w-[316px] h-[436px] p-[15px] rounded-[6px] bg-[#232932]">
          <div className="text-center text-white font-bold">Recharge</div>
          <Recharge token={BASE_TOKEN} />
        </div>
      </Modal>
    </div>
  );
}
