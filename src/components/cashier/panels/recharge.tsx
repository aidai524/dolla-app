import Button from "@/components/button";
import { QRCodeSVG } from "qrcode.react";
import useCopy from "@/hooks/use-copy";
import { PURCHASE_TOKEN } from "@/config";

export default function Recharge({ token }: { token: any }) {
  const rechargeToken = token || PURCHASE_TOKEN;
  const address = rechargeToken.address;
  const { onCopy } = useCopy();
  return (
    <div className="flex flex-col items-center">
      <div className="w-[160px] h-[160px] mt-[30px] rounded-[6px] bg-white p-2">
        <QRCodeSVG
          value={address}
          size={144}
          level="H"
          imageSettings={{
            src: rechargeToken.icon,
            height: 24,
            width: 24,
            excavate: true
          }}
        />
      </div>
      <div className="mt-[24px] px-[10px] py-[12px] rounded-[6px] bg-[#191E27] w-full">
        <div className="flex items-center text-white">
          <div className="text-[16px] font-semibold mr-[10px]">
            {rechargeToken.symbol}
          </div>
          <img
            className="w-[18px] h-[18px] rounded-[6px]"
            src="/chains/bera.png"
          />
          <div className="text-[14px] font-normal ml-[5px]">BeraChain</div>
        </div>
        <div className="flex items-center gap-[9px] mt-[12px]">
          <span className="text-[#ADBCCF] text-[14px] shrink-1 break-all leading-[18px]">
            {address}
          </span>
          <Button
            className="w-[60px] h-[32px] shrink-0"
            onClick={() => {
              onCopy(address);
            }}
          >
            Copy
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mt-[20px] text-[12px] text-[#ADBCCF]">
        <span className="text-[#ADBCCF]">Minimum deposit amount</span>
        <span className="text-white">
          {rechargeToken.symbol === "BTC" ? "0.001" : "1"}{" "}
          {rechargeToken.symbol}
        </span>
      </div>
      <div className="flex justify-between items-center w-full mt-[10px] text-[12px] text-[#ADBCCF]">
        <span className="text-[#ADBCCF]">Cost time</span>
        <span className="text-white">~2 mins</span>
      </div>
    </div>
  );
}
