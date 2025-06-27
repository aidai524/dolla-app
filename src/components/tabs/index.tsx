import { motion } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

export default function Tabs({
  currentTab,
  onChangeTab,
  tabs,
  className
}: any) {
  const prevI = useRef<number[]>([0]);
  return (
    <div className={clsx("flex items-center gap-[50px]", className)}>
      {tabs.map((tab: any, i: number) => (
        <div
          key={tab.key}
          className={clsx("button relative text-[14px] text-white pb-[10px]")}
          onClick={() => {
            onChangeTab(tab.key);
            prevI.current.push(i);
            if (prevI.current.length > 2) prevI.current.shift();
          }}
        >
          <span>{tab.label}</span>
          {currentTab === tab.key && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {
                  x: i < prevI.current[0] ? "50%" : "-50%"
                },
                show: {
                  x: "0%",
                  transition: {
                    staggerChildren: 0.3
                  }
                }
              }}
              className="absolute rounded-[3px] w-full h-[3px] bg-[#EBFF57] bottom-0"
            />
          )}
        </div>
      ))}
    </div>
  );
}
