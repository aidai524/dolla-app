import clsx from "clsx";

export default function RateTag({ rate, className }: any) {
  return (
    <div
      className={clsx(
        "w-[62px] text-center leading-[20px] text-[10px] text-white rounded-[20px] bg-[#00C771CC]",
        className
      )}
    >
      {rate}%
    </div>
  );
}
