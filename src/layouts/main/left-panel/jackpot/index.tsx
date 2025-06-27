import NftIcon from "./nft-icon";
import MemeIcon from "./meme-icon";
import BtcIcon from "./btc-icon";

export default function Jackpot() {
  return (
    <div className="bg-[#191817] rounded-[16px] mt-[16px] py-[10px]">
      <div className="flex gap-[12px] px-[20px] py-[20px] hover:bg-[#00000033] cursor-pointer duration-300">
        <NftIcon />
        <div>
          <div className="text-white text-[14px]">NFT Jackpot</div>
          <div className="text-[#8C8B8B] text-[10px] font-light">
            # Round 123
          </div>
        </div>
      </div>
      <div className="flex gap-[12px] px-[20px] py-[20px] hover:bg-[#00000033] cursor-pointer duration-300">
        <MemeIcon />
        <div>
          <div className="text-white text-[14px]">Meme Jackpot</div>
          <div className="text-[#8C8B8B] text-[10px] font-light">
            # Round 123
          </div>
        </div>
      </div>
      <div className="flex gap-[12px] px-[20px] py-[20px] hover:bg-[#00000033] cursor-pointer duration-300">
        <BtcIcon />
        <div>
          <div className="text-white text-[14px]">BTC Jackpot</div>
          <div className="text-[#8C8B8B] text-[10px] font-light">
            # Round 123
          </div>
        </div>
      </div>
    </div>
  );
}
