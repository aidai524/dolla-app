import clsx from "clsx";
import ActiveBg from "./active-bg";
import Avatar from "@/components/avatar";
import RateTag from "@/components/tags/rate";
import BoostTag from "@/components/tags/boost";

export default function Player({ active, item }: any) {
  return (
    <div
      className={clsx(
        active ? "border-[#EBFF5733]" : "border-[#242424]",
        "rounded-[24px] border-2 bg-[#191817] p-[2px] shrink-0 relative w-[146px] h-[181px]"
      )}
    >
      <div
        className={clsx(
          active ? "border-[#EBFF57]" : "border-[#3D3D3D] h-[147px]",
          "rounded-[20px] border-2 relative flex flex-col items-center justify-center h-[173px]"
        )}
        style={{
          background: active
            ? "radial-gradient(125% 100% at 50% 0%, rgba(235, 255, 87, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%), #191817"
            : "#191817"
        }}
      >
        <Avatar size={32} active={active} src={item?.user_avatar} />
        <div className="text-white text-[12px] mt-[6px]">{item?.user_name}</div>
        <RateTag
          className="mt-[8px]"
          rate={
            item?.winning_probability
              ? item?.winning_probability.toFixed(2)
              : "-"
          }
        />
        {active && (
          <>
            <ActiveBg className="absolute top-0 left-0" />
            <BoostTag
              size="medium"
              boost={10}
              className="absolute right-[-14px] top-[10px]"
            />
          </>
        )}
      </div>
    </div>
  );
}
