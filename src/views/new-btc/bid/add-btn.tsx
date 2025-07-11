import clsx from "clsx";

export default function AddBtn({
  isAdd = true,
  onClick,
  disabled
}: {
  isAdd?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={clsx(
        "w-[24px] h-[24px] bg-[#FFEA00] rounded-full button",
        disabled && "opacity-50"
      )}
      onClick={onClick}
    >
      <span className="text-[#000] text-[24px] font-bold font-[SpaceGrotesk] leading-[24px]">
        {isAdd ? "+" : "-"}
      </span>
    </button>
  );
}
