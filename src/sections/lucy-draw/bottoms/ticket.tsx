export default function TicketBottom({
  tickets,
  onBuyTicket
}: {
  tickets: number;
  onBuyTicket: () => void;
}) {
  return (
    <div className="flex items-center justify-end h-full relative z-[4]">
      <div className="bg-[url(/btc/ticket1.png)] w-[122px] h-[100px] bg-no-repeat bg-center bg-contain absolute top-[-20px] left-[-10px]" />
      <div className="w-[140px]">
        <div className="text-[12px] text-[#FFE9B2]">Auto Joined</div>
        <div className="flex items-center justify-between pr-[12px]">
          <span
            className="text-[#FFEF43] font-[AlfaSlabOne] text-[20px]"
            style={{
              WebkitTextStroke: "2px #5E3737"
            }}
          >
            x{tickets}
          </span>
          <button
            className="button rounded-[8px] text-white text-[18px] font-[BlackHanSans]"
            style={{
              WebkitTextStroke: "2px #5E3737"
            }}
            onClick={() => {
              onBuyTicket();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <circle cx="9" cy="9" r="9" fill="#FFC42F" />
              <path d="M10 8H13V10H10V13H8V10H5V8H8V5H10V8Z" fill="black" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
