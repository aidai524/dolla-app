import { useMemo, useRef, useState } from "react";
// import domtoimage from "dom-to-image";
import { Coins } from "./top";
import Big from "big.js";
import { formatNumber } from "@/utils/format/number";
import { formatAddress } from "@/utils/format/address";

export default function BTCShareCard({ data }: { data: any }) {
  const cardDomRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!cardDomRef.current || isLoading) return;

    try {
      setIsLoading(true);
      // const dataUrl = await domtoimage.toPng(cardDomRef.current, {
      //   quality: 1.0,
      //   bgcolor: "#232932",
      //   style: {
      //     transform: "scale(1)",
      //     transformOrigin: "top left"
      //   }
      // });

      // const a = document.createElement("a");
      // a.href = dataUrl;
      // a.download = "btc-share-card.png";
      // a.click();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const coins = useMemo(() => {
    const amount = Big(data.reward_amount)
      .div(10 ** data.reward_token_info?.[0]?.decimals)
      .toNumber();
    if (amount < 0.001) return [2, 2, 3, 3];
    if (amount < 0.01) return [4, 5, 5, 6];
    if (amount < 0.1) return [6, 7, 8, 9];
    return [10, 10, 10, 10];
  }, []);

  return (
    <div
      ref={cardDomRef}
      className="w-[597px] h-[352px] bg-[#232932] rounded-[6px] px-[30px] relative"
      onClick={handleDownload}
    >
      <div className="absolute left-[30px] bottom-[50px] w-[234px] h-[166px] z-[10] flex flex-col justify-center items-center">
        <div className="text-[42px] font-semibold text-transparent bg-clip-text bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)]">
          ${formatNumber(data?.value, 0, true)}
        </div>
        <div className="text-[20px] font-bold text-white">
          {formatNumber(
            Big(data.reward_amount).div(
              10 ** data.reward_token_info[0].decimals
            ),
            2,
            true
          )}{" "}
          {data.reward_token_info?.[0].symbol}
        </div>
        <div className="flex items-center text-[14px] mt-[10px]">
          <span className="text-[#ADBCCF] mr-[8px]">Provider:</span>
          {/* <img
            src=""
            className="w-[22px] h-[22px] rounded-[8px] border-2 border-white/80 mr-[10px] shrink-0"
          /> */}
          <span className="text-white">{formatAddress(data.user)}</span>
        </div>
      </div>
      <div className="absolute z-[2] bottom-[60px] right-[30px]">
        <Coins len={coins[0]} className="z-[5] left-[-280px]" />
        <Coins len={coins[1]} className="left-[-180px] z-[5]" />
        <Coins len={coins[2]} className="left-[-80px] z-[5]" />
        <Coins len={coins[3]} className="bottom-[50px] left-[-240px] z-[1]" />
      </div>
      <div className="absolute z-[1] right-0 top-0 bg-[url('/btc/btc-share-card.png')] bg-cover bg-center bg-no-repeat w-full h-full" />
    </div>
  );
}
