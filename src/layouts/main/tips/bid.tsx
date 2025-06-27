import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#2AFFE6", "#2626FF", "#FF3D94"];

export default function TipsBid({ data }: { data: any }) {
  const [nameWidth, setNameWidth] = useState(0);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nameRef.current && data) {
      setNameWidth(320 - nameRef.current.clientWidth);
    }
  }, [data]);
  return (
    <motion.div
      initial={{
        rotateZ: 0,
        backgroundColor: COLORS[0]
      }}
      animate={{
        rotateZ: [0, -5, 5, 0],
        backgroundColor: [COLORS[0], COLORS[1], COLORS[2], COLORS[0]]
      }}
      transition={{
        duration: 0.1,
        ease: "linear",
        repeat: 30
      }}
      key={data.id}
      className="w-[320px] h-[36px] inline-flex items-center p-[6px] bg-[#EBFF57] rounded-[10px]"
    >
      <div className="inline-flex items-center shrink-0" ref={nameRef}>
        {data?.user_avatar && (
          <img
            src={data.user_avatar}
            className="w-[24px] h-[24px] rounded-full border border-black"
          />
        )}
        <span className="text-[12px] text-black underline ml-[6px]">
          {data?.user_name}
        </span>
        <span className="text-[12px] text-black ml-[3px]">
          Bid <span className="font-bold">{data?.price}</span>{" "}
          {data?.currency?.toUpperCase()} for
        </span>
        {data?.asset_icon && (
          <img
            src={data.asset_icon}
            className="w-[24px] h-[24px] rounded-[4px] border border-black ml-[4px]"
          />
        )}
      </div>
      <div
        className="text-[12px] text-black h-full mt-[6px] underline truncate ml-[4px] shrink-0"
        style={{
          width: nameWidth - 30
        }}
      >
        {data?.asset_name}
      </div>
    </motion.div>
  );
}
