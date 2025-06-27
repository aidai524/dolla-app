export default function MoreMarketsBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="button w-[128px] h-[30px] rounded-[6px] border border-[#383F47] bg-[#1A1E24] flex items-center justify-center gap-[6px]"
      onClick={onClick}
    >
      <span className="text-[14px] text-[#ADBCCF]">More Markets</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
      >
        <path
          d="M1 1L5 6.00011L1 11"
          stroke="#9AA8B9"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
