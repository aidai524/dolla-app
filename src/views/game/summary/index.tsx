import { useMemo } from "react";
import useData from "../hooks/use-data";
import { useAuth } from "@/contexts/auth";

export default function Summary() {
  const { currentGame } = useData();
  const { userInfo } = useAuth();

  const [soldValue, userWager, userChance] = useMemo(() => {
    if (!currentGame) return [0, 0, 0];

    let _sv = 0;
    let _uw = 0;
    let _uc = 0;

    if (currentGame?.total_shares) {
      _sv = Math.round(currentGame?.sold_shares * currentGame?.share_price);
    }

    if (userInfo?.wallet_address) {
      currentGame.shares.forEach((item: any) => {
        if (
          item.user.wallet_address.toLowerCase() ===
          userInfo?.wallet_address.toLowerCase()
        ) {
          _uw += item.quantity;
        }
      });
    }

    if (_uw > 0) {
      _uc = Math.round((_uw / currentGame?.total_shares) * 100);
    }

    return [_sv, _uw, _uc];
  }, [currentGame, userInfo]);

  return (
    <div className="px-[40px] flex items-center gap-[12px] mt-[20px]">
      <SummaryItem
        label="Jackpot Value"
        total={currentGame?.total_prize ? parseInt(currentGame.total_prize) : 0}
        value={soldValue}
        icon={currentGame?.currencyIcon}
      />
      <SummaryItem
        label="Your Wager"
        value={userWager}
        icon={currentGame?.currencyIcon}
      />
      <SummaryItem
        label="Your Chance"
        value={`${userChance}%`}
        icon={currentGame?.currencyIcon}
      />
    </div>
  );
}

const SummaryItem = ({ label, value = "-", total = "-", icon }: any) => {
  return (
    <div className="bg-[#191817] rounded-[12px] h-[72px] grow flex flex-col items-center justify-center">
      <span className="text-[#ABABAB] text-[12px] font-light">{label}</span>
      <div className="flex items-center gap-[6px] mt-[10px]">
        {label !== "Chance" && (
          <img className="rounded-full w-[36px] h-[36px]" src={icon} />
        )}
        <span className="text-white text-[16px]">{value}</span>
        {label === "Jackpot Value" && (
          <span className="text-[#ABABAB] text-[12px]">/ {total}</span>
        )}
      </div>
    </div>
  );
};
