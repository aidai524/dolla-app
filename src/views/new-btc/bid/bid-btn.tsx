import clsx from "clsx";
import BidBtnBg from "./bid-btn-bg";

export default function BidBtn({
  onClick,
  loading
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={clsx(
        "w-[320px] h-[65px] ml-[20px] mr-[30px] relative button flex justify-center items-center",
        loading
          ? "opacity-50"
          : "hover:translate-y-[2px] hover:translate-x-[2px]"
      )}
    >
      <BidBtnBg className="absolute top-0 left-0" />
      <span
        className="text-[#3E2B2B] text-[30px] font-normal leading-[30px] uppercase relative z-[2] font-[BlackHanSans]"
        style={{
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#DD9000"
        }}
      >
        {loading ? "Bidding..." : "Bid!"}
      </span>
    </button>
  );
}
