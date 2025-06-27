import { motion } from "framer-motion";

const COLORS = ["#2AFFE6", "#2626FF", "#FF3D94"];

export default function TipsWon({ data }: { data: any }) {
  return (
    <motion.div
      className="w-[320px] h-[36px] flex items-center p-[6px] truncate rounded-[10px]"
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
    >
      {data?.user_avatar && (
        <img
          src={data.user_avatar}
          className="w-[24px] h-[24px] rounded-full border border-black"
        />
      )}
      <div className="text-[12px] text-black underline ml-[6px]">
        {data?.user_name}
      </div>
      <div className="text-[12px] text-black ml-[3px]">won</div>
      {data?.asset_icon && (
        <img
          src={data.asset_icon}
          className="w-[24px] h-[24px] rounded-[4px] border border-black ml-[4px]"
        />
      )}
      <div className="text-[12px] text-black underline ml-[4px]">
        {data?.asset_name}
      </div>
    </motion.div>
  );
}
