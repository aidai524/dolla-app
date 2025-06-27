import clsx from "clsx";
import { useMemo } from "react";

const THEME = ["#A196FF", "#FF60A8", "#FFC760"];

export default function UserLevel({ level }: { level: number }) {
  const theme = useMemo(() => {
    if (level <= 10) return THEME[0];
    if (level <= 20) return THEME[1];
    if (level <= 30) return THEME[2];
  }, [level]);
  return (
    <div
      className={clsx(
        "rounded-[8px] px-[6px] py-[2px] text-white text-[8px] inline-flex items-center border"
      )}
      style={{
        borderColor: theme,
        backgroundColor: `${theme}33`
      }}
    >
      {level}
    </div>
  );
}
