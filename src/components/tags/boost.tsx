import clsx from "clsx";

export default function BoostTag({
  size,
  boost,
  className
}: {
  size: "small" | "medium";
  boost: number;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "rotate-10 rounded-[20px] inline-flex items-center text-[center] border border-[#EBFF57] bg-[#0000004D] backdrop-blur-[5px] font-bold",
        size === "small"
          ? "h-[20px] px-[6px] text-[10px]"
          : "h-[26px] px-[12px] text-[14px] text-shadow-[0px_0px_10px_rgba(235,255,87,0.50)] text-[#EBFF57]"
      )}
    >
      {boost} x
    </div>
  );
}
