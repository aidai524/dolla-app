import Avatar from "@/components/avatar";
import MultiIcon from "./multi-icon";
import PlayerDistribution from "./player-distribution";
import { formatAddress } from "@/utils/format/address";
import dayjs from "@/libs/dayjs";
import { addThousandSeparator } from "@/utils/format/number";

// win 14 4
export default function EndPanel({ data }: { data: any }) {
  console.log(data);
  return (
    <div className="w-[815px] h-full flex gap-[20px] p-[20px] rounded-[20px] border border-[#605D55] bg-[#FFFFFF1A] backdrop-blur-[10px]">
      <div className="w-[250px] h-full rounded-[20px] bg-[#00000033] px-[20px] pt-[10px]">
        <div className="flex items-center justify-between">
          <span
            className="text-white text-[24px] [text-shadow:0_0_10px_rgba(255,213,105,0.5)] font-[DelaGothicOne]"
            style={{
              WebkitTextStroke: "1px #EEAF0F"
            }}
          >
            Winner
          </span>
          <button className="text-[12px] underline button text-[#FFE9B2]">
            Verify
          </button>
        </div>
        <div className="relative mx-auto mt-[47px] rounded-full flex items-center justify-center">
          <div className="absolute z-[3] top-[-30px] right-[-30px] w-[93px] h-[93px] flex items-center justify-center">
            <MultiIcon className="absolute top-0 left-0 w-full h-full" />
            <div className="text-black text-[24px] font-[DelaGothicOne] relative z-[1] rotate-[8deg]">
              x100
            </div>
          </div>
          <Avatar
            size={150}
            address={data.winner_user_info?.sol_user}
            email={data.winner_user_info?.email}
          />
        </div>
        <div className="text-white text-center text-[16px] font-[DelaGothicOne] mt-[10px]">
          0xdollar
        </div>
        <div className="flex items-center justify-between mt-[30px]">
          <span className="text-[#FFE9B2] text-[14px]">Winner’s bid</span>
          <span className="text-white text-[12px] font-[DelaGothicOne]">
            $350
          </span>
        </div>
        <div className="flex items-center justify-between mt-[4px]">
          <span className="text-[#FFE9B2] text-[14px]">Bid times</span>
          <span className="text-white text-[12px] font-[DelaGothicOne]">
            $350
          </span>
        </div>
        <div className="flex items-center justify-between mt-[4px]">
          <span className="text-[#FFE9B2] text-[14px]">Return multiple</span>
          <span className="text-white text-[12px] font-[DelaGothicOne]">
            $350
          </span>
        </div>
      </div>
      <div className="grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <Avatar
              size={32}
              address={data.user_info?.sol_user}
              email={data.user_info?.email}
            />
            <div>
              <div className="text-[#FFE9B2] text-[12px]">Provider</div>
              <div className="text-white text-[12px] font-[DelaGothicOne]">
                {data.user_info?.email ||
                  formatAddress(data.user_info?.sol_user)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#FFE9B2] text-[12px]">Started from</div>
            <div className="text-white text-[14px]">
              {dayjs(data.user_info?.created_at).format("HH:mm DD MMM, YYYY")}{" "}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[12px] mt-[16px] font-[DelaGothicOne] text-white">
          <div className="w-1/3 h-[70px] flex flex-col items-center justify-center bg-[#00000033] rounded-[10px]">
            <div className="text-[12px]">Total Players</div>
            <div className="text-[16px]">{data?.participants}</div>
          </div>
          <div className="w-1/3 h-[70px] flex flex-col items-center justify-center bg-[#00000033] rounded-[10px]">
            <div className="text-[12px]">Total Bid</div>
            <div className="text-[16px]">
              ${addThousandSeparator(data?.accumulative_bids)}
            </div>
          </div>
          <div className="w-1/3 h-[70px] flex flex-col items-center justify-center bg-[#00000033] rounded-[10px]">
            <div className="text-[12px]">Time Duration</div>
            <div className="text-[16px]">
              {data?.created_at && data?.updated_at
                ? dayjs(data.created_at).from(dayjs(data.updated_at), true)
                : "-"}
            </div>
          </div>
        </div>
        <div className="mt-[8px]">
          <div className="text-white text-[12px] font-[DelaGothicOne]">
            Winner’s Bid Timing
          </div>
          <div className="w-full relative h-[6px] mt-[40px] bg-linear-to-r from-[#FFC42F] via-[#FF43E0] to-[#53EABF] rounded-[6px]">
            <div className="w-[28px] h-[28px] border border-[#DD9000] rounded-[6px] absolute top-[-33px]">
              <Avatar
                size={26}
                address={data.winner_user_info?.sol_user}
                email={data.winner_user_info?.email}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                className="absolute bottom-[-6px] left-[50%] translate-x-[-50%]"
              >
                <path
                  d="M3.18912 4.8764C3.58825 5.42946 4.41175 5.42946 4.81088 4.87641L7.1861 1.58521C7.6634 0.923842 7.19083 0 6.37522 0H1.62478C0.809174 0 0.336598 0.923841 0.813896 1.58521L3.18912 4.8764Z"
                  fill="#DD9000"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-[24px] h-[calc(100%-250px)]">
          <div className="text-white text-[12px] font-[DelaGothicOne]">
            Player Distribution
          </div>
          <PlayerDistribution data={data} />
        </div>
      </div>
    </div>
  );
}
