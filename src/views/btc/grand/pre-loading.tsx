import { motion } from "framer-motion";

export default function PreLoading() {
  return (
    <motion.div
      className="w-full h-full absolute top-0 left-0 z-50 bg-radial from-black/60 to-black/0"
      animate={{
        opacity: [1, 0.2, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    ></motion.div>
  );
}
