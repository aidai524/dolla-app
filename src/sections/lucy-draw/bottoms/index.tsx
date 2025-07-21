import StarBg from "../star-bg";
import TicketBottom from "./ticket";

export default function Bottoms({
  status,
  tickets,
  onBuyTicket,
  winningList
}: {
  status: number;
  tickets: number;
  onBuyTicket: () => void;
  winningList: any[];
}) {
  return (
    <>
      <div className="flex absolute z-[1] bottom-0">
        <StarBg />
        <StarBg className="ml-[-50px]" />
        <StarBg className="ml-[-50px]" />
      </div>
      {status === 0 && (
        <TicketBottom tickets={tickets} onBuyTicket={onBuyTicket} />
      )}
      {status === 1 && (
        <div className="relative z-[2] w-full h-full flex items-center justify-center bg-[url(/btc/lucky-draw-loading.gif)] bg-no-repeat bg-center bg-contain" />
      )}
      {status === 2 && (
        <>
          <div className="relative z-[2] w-full h-full flex items-center justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <img
                key={item}
                className="w-[30px] h-[30px] rounded-full border border-[#DD9000] ml-[-10px]"
              />
            ))}
          </div>
          <div className="absolute bottom-[-100px] left-0 w-[300px] h-[300px] bg-[url(/btc/lucky-draw-success.gif)] bg-no-repeat bg-center bg-contain" />
        </>
      )}
    </>
  );
}
