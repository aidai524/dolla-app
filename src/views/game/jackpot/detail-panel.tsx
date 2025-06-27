import Avatar from "@/components/avatar";
import LinkIcon from "./link-icon";
import { formatAddress } from "@/utils/format/address";
import { formatNumber } from "@/utils/format/number";

export default function DetailPanel({ game }: any) {
  return (
    <div
      className="p-[20px] rounded-[20px] absolute w-[452px]"
      style={{
        background:
          "radial-gradient(45.01% 100% at 5.32% 0%, rgba(235, 255, 87, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%), #191817"
      }}
    >
      <div className="flex gap-[10px]">
        <Avatar size={78} />
        <div className="mt-[4px]">
          <div className="text-white text-[18px] font-medium">
            {game?.asset?.token_id} {game?.asset?.name}
          </div>
          <div className="text-[12px] font-light mt-[8px]">
            <span className="text-[#ABABAB]">Owned by:</span>{" "}
            <span className="text-white">
              {formatAddress(game?.asset?.seller?.contract_address)}
            </span>
          </div>
        </div>
      </div>
      <div className="text-[12px] font-light mt-[16px]">
        <div className="flex">
          <div className="w-3/5">
            <div className="text-[#ABABAB]">Last Sold</div>
            <div className="mt-[6px]">
              <span className="font-semibold text-white">127.33</span>
              <span className="text-[#ABABAB]"> {game?.asset?.currency}</span>
            </div>
          </div>
          <div className="w-2/5">
            <div className="text-[#ABABAB]">Jackpot Shares</div>
            <div className="mt-[6px]">
              <span className="font-semibold text-white">127.33</span>
              <span className="text-[#ABABAB]"> {game?.asset?.currency}</span>
            </div>
          </div>
        </div>
        <div className="text-[#ABABAB] mt-[10px]"> {game?.asset?.name}</div>
        <div className="flex mt-[8px]">
          <div className="w-3/5">
            <div className="text-[#ABABAB]">Floor Price</div>
            <div className="mt-[6px]">
              <span className="font-semibold text-white">
                {formatNumber(game?.asset?.floor_price, 2, true)}
              </span>
              <span className="text-[#ABABAB]"> {game?.asset?.currency}</span>
              <span className="text-[10px] text-[#EBFF57]"> +2.35%</span>
            </div>
          </div>
          <div className="w-2/5">
            <div className="text-[#ABABAB]">24h Vol</div>
            <div className="mt-[6px]">
              <span className="font-semibold text-white">127.33</span>
              <span className="text-[#ABABAB]"> {game?.asset?.currency}</span>
            </div>
          </div>
        </div>
        <a
          href={
            !game?.asset?.contract_address
              ? `https://magiceden.io/collections/berachain/${game.asset.contract_address}`
              : ""
          }
          target="_blank"
          className="text-[#ABABAB] mt-[18px] flex gap-[8px] items-center"
        >
          <span>View on Magic Eden</span>
          <LinkIcon />
        </a>
      </div>
    </div>
  );
}
