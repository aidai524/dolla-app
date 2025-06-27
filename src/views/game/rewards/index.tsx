import RewardsIcon from "./icon";
import { motion } from "framer-motion";

export default function Rewards() {
  return (
    <motion.div
      className="flex items-end text-[#EBFF57] absolute top-[30px] left-[50%] translate-x-[-50%] z-10"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <RewardsIcon />
      <span className="font-bold text-[26px] mb-[25px] mr-[6px] ml-[-30px]">
        120
      </span>
      <span className="font-bold text-[16px] mb-[30px]">BERA</span>
    </motion.div>
  );
}
