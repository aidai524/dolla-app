import clsx from "clsx";
import { motion } from "framer-motion";
import { ComponentProps, useRef } from "react";

type SwitchProps = Omit<ComponentProps<"div">, "onChange"> & {
  tabs: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  className?: string;
  tab: string;
  type?: "card" | "line";
  tabClassName?: string;
};

export default function Switch({
  tab,
  tabs,
  onChange,
  className,
  type = "card",
  tabClassName
}: SwitchProps) {
  const prevI = useRef<number[]>([0]);
  return (
    <div
      className={clsx(
        "h-[36px] bg-[#222A35] rounded-[6px] p-[3px] text-[16px] font-medium flex items-center justify-between",
        className
      )}
    >
      {tabs.map((item, i) => (
        <button
          key={item.value}
          className={clsx(
            "px-[10px] h-full rounded-[6px] button relative",
            tab === item.value && type === "card" ? "text-black" : "text-white",
            tabClassName
          )}
          onClick={() => {
            onChange(item.value);
            prevI.current.push(i);
            if (prevI.current.length > 2) prevI.current.shift();
          }}
        >
          <span className="relative z-1">{item.label}</span>
          {tab === item.value && (
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
              className={clsx(
                "absolute left-0",
                type === "card"
                  ? "w-full h-full top-0 rounded-[4px] shadow-[0px_0px_6px_0px_#FFC42F]"
                  : "w-full h-[2px] bottom-[-2px] "
              )}
              style={{
                background:
                  type === "card"
                    ? "radial-gradient(50% 50% at 50% 50%, #FFEF43 0%, #FFC42F 100%)"
                    : "#FFC42F"
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
