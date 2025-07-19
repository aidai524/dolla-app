import Big from "big.js";
import clsx from "clsx";

const Pagination = (props: any) => {
  const { className, current = 1, total = 0, size = 10, isCurrentSize = false, onPrev, onNext } = props;

  return (
    <div className={clsx("flex items-center gap-[18px] text-[#BBACA6] font-[SpaceGrotesk] text-[14px] font-normal leading-[14px]", className)}>
      <button
        type="button"
        className={clsx("w-[32px] h-[32px] rounded-[16px] border border-[#6A5D3A] flex items-center justify-center bg-black/20", current <= 1 ? "cursor-not-allowed" : "cursor-pointer")}
        onClick={() => {
          if (current <= 1) {
            return;
          }
          onPrev?.();
        }}
      >
        <PaginationArrow active={current > 1} />
      </button>
      <div className="flex items-center gap-[4px]">
        <div className="">{isCurrentSize ? Big(current).times(size).toFixed(0) : current}</div>
        <div className="">of</div>
        <div className="">{total}</div>
      </div>
      <button
        type="button"
        className={clsx("w-[32px] h-[32px] rounded-[16px] border border-[#6A5D3A] flex items-center justify-center bg-black/20", current >= total ? "cursor-not-allowed" : "cursor-pointer")}
        onClick={() => {
          if (current >= total) {
            return;
          }
          onNext?.();
        }}
      >
        <PaginationArrow className="rotate-180" active={current < total} />
      </button>
    </div>
  );
};

export default Pagination;

const PaginationArrow = (props: any) => {
  const { className, active } = props;

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="7" height="14" viewBox="0 0 7 14" fill="none">
      <path opacity={active ? "1" : "0.3"} d="M6 1L1 7L6 13" stroke="white" stroke-width="1.5" />
    </svg>
  );
};
