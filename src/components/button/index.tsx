import clsx from "clsx";
import Loading from "../icons/loading";
import { useMemo } from "react";

export default function Button({
  children,
  disabled,
  onClick = () => {},
  className,
  loading,
  isPrimary = true
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  isPrimary?: boolean;
}) {
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
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "rounded-[6px] flex items-center justify-center text-black",
        isPrimary &&
          "bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)] shadow-[0px_0px_6px_0px_#FFC42F] ",
        className,
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer button"
      )}
    >
      {loading ? <Loading size={Math.min(size, 20)} /> : children}
    </button>
  );
}
