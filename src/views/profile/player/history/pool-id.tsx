// import Avatar from "@/components/avatar";
import Market from "@/views/btc/markets/market";
// import MarkIcon from "./mark-icon";
import clsx from "clsx";

export default function PoolId({ data }: { data: any }) {
  return (
    <div className={clsx("relative", data.is_winner && "group")}>
      <span>#{data.pool_id}</span>
      <div className="absolute bottom-0 right-0 z-[100] invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <Market
          data={data}
          className="w-[200px]"
          // footer={
          //   <div className="border-t border-dashed border-t-[#121417] mt-[14px] flex justify-between items-center text-[12px] h-[60px] px-[12px] relative">
          //     <div className="absolute top-[-20px] right-[-20px] z-[20] w-[41px] h-[41px] rotate-[10deg]">
          //       <MarkIcon />
          //       <div className="text-[12px] text-black text-center leading-[12px] font-bold absolute top-[8px] left-0 w-full h-full">
          //         <div>530</div>
          //         <div>%</div>
          //       </div>
          //     </div>
          //     <div className="flex items-center gap-[8px]">
          //       <Avatar size={32} className="border-[2px] border-[#FFFFFFCC]" />
          //       <div>
          //         <div className="w-[54px] h-[14px] rounded-[10px] bg-[#EBFF57] flex items-center justify-center text-[10px] text-black">
          //           Winner
          //         </div>
          //         <span className="text-[14px] text-white mt-[4px]">
          //           0xdollar
          //         </span>
          //       </div>
          //     </div>
          //     <div className="flex items-center gap-[8px] text-[14px]">
          //       <span className="text-[#ADBCCF]">$20</span>
          //       <svg
          //         xmlns="http://www.w3.org/2000/svg"
          //         width="10"
          //         height="12"
          //         viewBox="0 0 10 12"
          //         fill="none"
          //       >
          //         <path
          //           d="M9.5 5.13397C10.1667 5.51887 10.1667 6.48113 9.5 6.86603L2 11.1962C1.33333 11.5811 0.499999 11.0999 0.5 10.3301L0.5 1.66987C0.5 0.900072 1.33333 0.418947 2 0.803847L9.5 5.13397Z"
          //           fill="#ADBCCF"
          //         />
          //       </svg>
          //       <span className="text-white">$106.2</span>
          //     </div>
          //   </div>
          // }
        />
      </div>
    </div>
  );
}
