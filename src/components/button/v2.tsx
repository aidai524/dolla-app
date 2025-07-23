import clsx from "clsx";
import Loading from "../icons/loading";
import { useMemo } from "react";

const ButtonV2 = (props: any) => {
  const {
    className,
    children,
    type = "primary",
    htmlType = "button",
    loading,
    ...restProps
  } = props;
  const size = useMemo(() => {
    if (className?.includes("h-")) {
      const match = className.match(/h-\[(\d+)px\]/);
      if (match) {
        return parseInt(match[1]) * 0.6;
      }
    }
    return 20;
  }, [className]);
  return (
    <button
      type={htmlType}
      className={clsx(
        "shrink-0 font-[SpaceGrotesk] cursor-pointer flex justify-center items-center px-[17px] h-[32px] rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed",
        type === "default" &&
          "border border-[#6A5D3A] text-white text-[14px] px-[10px] bg-black/20 [background-image:none]",
        type === "primary" &&
          "text-[16px] text-black font-[500] bg-[linear-gradient(180deg,_#FFF698_0%,_#FFC42F_100%)]",
        className
      )}
      {...restProps}
    >
      {loading ? <Loading size={Math.min(size, 20)} /> : children}
    </button>
  );
};

export default ButtonV2;
