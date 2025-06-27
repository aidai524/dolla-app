import { motion } from "framer-motion";

export default function NewHints({ num }: { num: number }) {
  return (
    <motion.div
      className="absolute flex justify-center items-center w-[270px] h-[60px] left-[-268px]"
      animate={{
        x: [-10, 10, -10]
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <div className="relative z-[2] text-[14px] font-bold italic">
        Fresh to show {num} new cards
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="269"
        height="60"
        viewBox="0 0 269 60"
        fill="none"
        className="absolute z-[1]"
      >
        <path
          d="M0 16C0 7.16344 7.16344 0 16 0H246C254.837 0 262 7.16344 262 16V23C262 23.6295 262.296 24.2223 262.8 24.6L267.867 28.4C268.933 29.2 268.933 30.8 267.867 31.6L262.8 35.4C262.296 35.7777 262 36.3705 262 37V44C262 52.8366 254.837 60 246 60H16C7.16345 60 0 52.8366 0 44V16Z"
          fill="#EBFF57"
        />
      </svg>
    </motion.div>
  );
}
