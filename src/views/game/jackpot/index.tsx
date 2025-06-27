import Time from "./time";
import Info from "./info";
import Avatar from "@/components/avatar";
import useData from "../hooks/use-data";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Jackpot() {
  const { open, preopen, currentGame } = useData();

  const [percent] = useMemo(() => {
    let _percent = 0;
    if (currentGame?.total_shares) {
      _percent = Math.round(
        (parseInt(currentGame.sold_shares) /
          parseInt(currentGame.total_shares)) *
          100
      );
    }

    return [_percent];
  }, [currentGame]);

  return (
    currentGame?.asset && (
      <div className="pt-[28px] pb-[18px] px-[30px] relative rounded-[12px]">
        {currentGame?.asset?.image_url && (
          <div
            className="rounded-[12px] w-full h-full opacity-50 absolute top-0 left-0"
            style={{
              background: `radial-gradient(100% 100% at 50% 0%, rgba(0, 0, 0, 0.00) 0%, #000 100%), url(${currentGame.asset.image_url}) lightgray 50% / cover no-repeat`
            }}
          />
        )}
        <div className="flex justify-between relative z-1">
          <div className="flex gap-[10px]">
            {!(open || preopen) && currentGame?.asset?.image_url && (
              <Avatar size={94} src={currentGame.asset.image_url} />
            )}
            <div className="mt-[10px]">
              <Info game={currentGame} />
            </div>
          </div>
          {(open || preopen) && currentGame?.asset?.image_url && (
            <motion.div
              initial={{ scale: 0.537, x: -362 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Avatar size={175} src={currentGame.asset.image_url} />
            </motion.div>
          )}
          <Time time={currentGame?.end_time} />
        </div>
        <div className="relative mt-[26px] relative z-1">
          <div className="w-full h-[10px] bg-[#191817] rounded-full">
            <div
              className="h-full bg-[#EBFF57] rounded-full relative"
              style={{ width: percent + "%", minWidth: 40 }}
            >
              <div className="absolute -right-4 -top-3 bg-[#EBFF57] text-black text-[14px] rounded-full w-[58px] h-[32px] leading-[32px] text-center">
                {percent}%
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
