import Progress from "./progress";
import { useBtcContext } from "../../context";
import { formatNumber } from "@/utils/format/number";
import Big from "big.js";
import { formatAddress } from "@/utils/format/address";
import { useMemo } from "react";

export default function MarketInfo() {
  const { pool } = useBtcContext();

  const [amount] = useMemo(() => {
    const reward_amount = pool.reward_amount || 0;
    const decimals = pool.reward_token_info?.[0]?.decimals || 1;
    const _a = formatNumber(Big(reward_amount).div(10 ** decimals), 2, true);
    return [_a];
  }, [pool]);

  return (
    <div className="absolute left-[20px] bottom-[24%]">
      <div className="flex items-center gap-[50px]">
        <div className="flex items-center gap-[8px]">
          {/* <img
            src="/images/new-btc/header/icon-1.png"
            className="w-[32px] h-[32px] rounded-[6px] border border-[2px] border-white/40"
          /> */}
          <div>
            <div className="text-[#FFE9B2] text-[12px]">Provider</div>
            <div className="text-white text-[14px]">
              {formatAddress(pool.user)}
            </div>
          </div>
        </div>
        <div>
          <div className="text-[#FFE9B2] text-[12px]">Players</div>
          <div className="text-white text-[14px]">{pool.participants}</div>
        </div>
        <div>
          <div className="text-[#FFE9B2] text-[12px]">Bid</div>
          <div className="text-white text-[14px]">{pool.accumulative_bids}</div>
        </div>
      </div>
      <div className="mt-[28px] font-[BlackHanSans]">
        <div
          className="text-white text-[16px] [text-shadow:_-2px_0_#5E3737,0_2px_#5E3737,2px_0_#5E3737,0_-2px_#5E3737] [font-size:16px] [--tw-text-stroke-width:2px] [--tw-text-stroke-color:#5E3737]"
          style={{
            WebkitTextStrokeWidth: "2px",
            WebkitTextStrokeColor: "#5E3737"
          }}
        >
          GRAND
        </div>
        <div
          className="font-[DelaGothicOne] mt-[-8px] text-[46px] bg-clip-text bg-[linear-gradient(180deg,#FFF698_0%,#FFC42F_100%)]"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          {amount} BTC
        </div>
      </div>
      <div className="mt-[28px] font-[BlackHanSans]">
        <div
          className="text-white text-[16px] [text-shadow:_-2px_0_#5E3737,0_2px_#5E3737,2px_0_#5E3737,0_-2px_#5E3737] [font-size:16px] [--tw-text-stroke-width:2px] [--tw-text-stroke-color:#5E3737]"
          style={{
            WebkitTextStrokeWidth: "2px",
            WebkitTextStrokeColor: "#5E3737"
          }}
        >
          Valued
        </div>
        <div
          className="font-[DelaGothicOne] mt-[-8px] text-[46px] bg-clip-text bg-[linear-gradient(180deg,#FFF698_0%,#FFC42F_100%)]"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          ${formatNumber(pool.value, 2, true)}
        </div>
      </div>
      <Progress data={pool} />
    </div>
  );
}
