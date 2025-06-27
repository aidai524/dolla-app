import Avatar from "@/components/avatar";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function SoldLayer({
  winner,
  from
}: {
  winner: any;
  from: string;
}) {
  return (
    <div
      className={clsx(
        "absolute top-0 left-0 w-[230px] h-[322px] bg-black/50 z-[30] overflow-hidden",
        from === "list" ? "w-[230px] h-[322px]" : "w-[351px] h-[514px]"
      )}
    >
      <motion.div
        className={clsx(
          "absolute font-black rotate-[30deg] h-[38px] bg-[#B4CC00] text-[12px] font-bold flex items-center justify-center gap-[30px]",
          from === "list"
            ? "w-[300px] pl-[40px] top-[140px] left-[-40px]"
            : "w-[460px] pl-[40px] top-[240px] left-[-60px]"
        )}
        initial={{ x: from === "list" ? -300 : -460 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span>Congrats!</span>
        <span>Congrats!</span>
        <span>Congrats!</span>
      </motion.div>
      <motion.div
        initial={{ x: from === "list" ? 300 : 460 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        className={clsx(
          "absolute  h-[38px] bg-[#EBFF57] flex items-center justify-center gap-[10px] rotate-[-30deg]",
          from === "list"
            ? "w-[320px] top-[140px] left-[-40px]"
            : "w-[480px] top-[240px] left-[-60px]"
        )}
      >
        <Avatar size={32} src={winner.avatar} />
        <div className="text-[12px]">
          <div className="font-bold">{winner.name}</div>
        </div>
      </motion.div>
    </div>
  );
}
