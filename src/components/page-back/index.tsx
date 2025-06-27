import clsx from "clsx";

export default function PageBack({
  className,
  onClick
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={clsx("button flex items-center gap-[5px]", className)}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="15"
        viewBox="0 0 12 15"
        fill="none"
      >
        <path
          d="M1.18645 8.02202C0.612441 7.62434 0.612441 6.77571 1.18645 6.37803L7.43051 2.05202C8.09371 1.59254 9 2.0672 9 2.87402L9 11.526C9 12.3329 8.09371 12.8075 7.4305 12.348L1.18645 8.02202Z"
          fill="#8C8B8B"
        />
      </svg>
      <span className="text-[#ABABAB] text-[12px] font-light">Back</span>
    </button>
  );
}
