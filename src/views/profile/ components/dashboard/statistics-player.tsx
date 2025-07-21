import clsx from "clsx";
import ButtonV2 from "@/components/button/v2";
import LabelValue from "../label-value";
import { useMemo, useState } from "react";
import { formatNumber } from "@/utils/format/number";
import Big from "big.js";
import CashierModal from "@/sections/cashier/modal";
import { useAuth } from "@/contexts/auth";
import useTokenBalance from "@/hooks/solana/use-token-balance";
import Loading from "@/components/icons/loading";
import { QUOTE_TOKEN } from "@/config/btc";

const StatisticsPlayer = (props: any) => {
  const { className } = props;

  const { userInfo } = useAuth();
  const { tokenBalance, isLoading } = useTokenBalance({ address: QUOTE_TOKEN.address, decimals: QUOTE_TOKEN.decimals });

  const [cashierModalOpen, setCashierModalOpen] = useState(false);
  const [cashierModalTab, setCashierModalTab] = useState("fund");

  const wonTotalUsd = useMemo(() => {
    if (!userInfo) {
      return 0;
    }
    return userInfo.you_won.reduce((acc: any, item: any) => acc + item.token_usd, 0);
  }, [userInfo]);

  return (
    <div className={clsx("w-full mt-[20px] flex items-center justify-between gap-[40px]", className)}>
      <div className="flex items-center">
        <div className="flex flex-col justify-center items-center gap-[15px] p-[20px_32px_33px] bg-[#22201D] border border-[#6A5D3A] rounded-[16px] shrink-0">
          <div className="">Wins</div>
          <div className="font-[DelaGothicOne] text-[36px]">
            {formatNumber(userInfo?.you_won?.length, 2, true)}
          </div>
        </div>
        <LabelValue label="#BTC" className="ml-[45px]">
          {formatNumber(0, 2, true)}
        </LabelValue>
        <ButtonV2
          className="ml-[64px]"
          onClick={() => { }}
          disabled
        >
          Share
        </ButtonV2>
      </div>
      <div className="w-[1px] h-[70px] shrink-0 bg-[#423930]"></div>
      <div className="flex items-center">
        <LabelValue label="Your Balance" className="whitespace-nowrap">
          {isLoading ? (
            <Loading size={12} />
          ) : formatNumber(tokenBalance, 2, true, { prefix: "$" })}
        </LabelValue>
        <LabelValue label="Played times" className="ml-[62px] whitespace-nowrap">
          {formatNumber(userInfo?.played, 2, true, { isShort: Big(userInfo?.played || 0).gt(1000000), isShortUppercase: true })}
        </LabelValue>
        <div className="flex items-center justify-end gap-[10px] ml-[70px]">
          <ButtonV2
            className=""
            onClick={() => {
              setCashierModalTab("fund");
              setCashierModalOpen(true);
            }}
          >
            Fund
          </ButtonV2>
          <ButtonV2
            className=""
            type="default"
            onClick={() => {
              setCashierModalTab("withdraw");
              setCashierModalOpen(true);
            }}
          >
            Withdraw
          </ButtonV2>
        </div>
      </div>
      <CashierModal
        open={cashierModalOpen}
        defaultTab={cashierModalTab}
        onClose={() => {
          setCashierModalOpen(false);
        }}
      />
    </div>
  );
};

export default StatisticsPlayer;
