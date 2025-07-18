import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";
import Market from "./market";
import MoreMarketBtn from "./btn";
import MarketLoading from "./market-loading";
import usePoolList from "@/hooks/use-pool-list";

export default function Markets({ onClose }: { onClose: () => void }) {
  const [prizeSize, setPrizeSize] = useState(0);
  const [sortBy, setSortBy] = useState("");

  const {
    poolList,
    loading,
    onQueryPoolList,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    hasMore,
    pageRef
  } = usePoolList();

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-[50]"
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }}
    >
      <div className="bg-[#1A1E24] border-b border-[#3C3420]">
        <div className="relative z-[2]">
          <div className="p-[20px] pb-[0px] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <img
                src="/logo.svg"
                alt="dolla"
                className="w-[101px] h-[30px] mt-[-6px]"
              />
              <span className="text-[#9CBBFC] text-[30px] font-[BlackHanSans]">
                Markets
              </span>
            </div>
            <div className="flex items-center gap-[46px] text-[#ADBCCF] text-[12px]">
              <div className="flex items-center gap-[8px]">
                <div className="mr-[5px]">Prize Size</div>
                {[0, 1, 0.1, 0.01].map((item: number) => (
                  <button
                    key={item}
                    className={clsx(
                      "button px-[12px] py-[9px] border border-[#383F47] rounded-[6px] w-min-[54px]",
                      prizeSize === item
                        ? "bg-[#FFC42F] text-black"
                        : "bg-[#1A1E24]"
                    )}
                    onClick={() => setPrizeSize(item)}
                  >
                    {item === 0 ? "ALL" : `${item} BTC`}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-[8px]">
                <div className="mr-[5px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                  >
                    <path
                      d="M11.4211 3.68346C11.5188 3.68346 11.6125 3.72227 11.6816 3.79135C11.7507 3.86043 11.7895 3.95412 11.7895 4.05181V10.745L12.8502 9.68493C12.9192 9.61588 13.0129 9.57709 13.1106 9.57709C13.2083 9.57709 13.302 9.61588 13.3711 9.68493L13.8921 10.2058C13.9611 10.2749 13.9999 10.3685 13.9999 10.4662C13.9999 10.5639 13.9611 10.6575 13.8921 10.7266L11.8878 12.7304C11.7627 12.8555 11.6041 12.9419 11.4311 12.9793C11.258 13.0166 11.0779 13.0033 10.9123 12.941C10.7466 12.8787 10.6024 12.7699 10.497 12.6278C10.3915 12.4857 10.3293 12.3162 10.3176 12.1396L10.3158 12.0792V4.05181C10.3158 3.95412 10.3546 3.86043 10.4237 3.79135C10.4928 3.72227 10.5865 3.68346 10.6842 3.68346H11.4211ZM7.73684 11.0504C7.78522 11.0504 7.83313 11.0599 7.87783 11.0784C7.92253 11.0969 7.96314 11.1241 7.99736 11.1583C8.03157 11.1925 8.05871 11.2331 8.07722 11.2778C8.09573 11.3225 8.10526 11.3704 8.10526 11.4187V12.1554C8.10526 12.2038 8.09573 12.2517 8.07722 12.2964C8.05871 12.3411 8.03157 12.3817 7.99736 12.4159C7.96314 12.4501 7.92253 12.4772 7.87783 12.4957C7.83313 12.5143 7.78522 12.5238 7.73684 12.5238H0.368421C0.320039 12.5238 0.272131 12.5143 0.227433 12.4957C0.182734 12.4772 0.142119 12.4501 0.107908 12.4159C0.073697 12.3817 0.0465594 12.3411 0.0280445 12.2964C0.00952959 12.2517 -2.26789e-09 12.2038 0 12.1554V11.4187C-2.26789e-09 11.3704 0.00952959 11.3225 0.0280445 11.2778C0.0465594 11.2331 0.073697 11.1925 0.107908 11.1583C0.142119 11.1241 0.182734 11.0969 0.227433 11.0784C0.272131 11.0599 0.320039 11.0504 0.368421 11.0504H7.73684ZM7.73684 5.5252C7.78522 5.5252 7.83313 5.53472 7.87783 5.55324C7.92253 5.57175 7.96314 5.59888 7.99736 5.63308C8.03157 5.66729 8.05871 5.70789 8.07722 5.75258C8.09573 5.79727 8.10526 5.84517 8.10526 5.89354V6.63024C8.10526 6.67861 8.09573 6.72651 8.07722 6.7712C8.05871 6.81589 8.03157 6.85649 7.99736 6.8907C7.96314 6.9249 7.92253 6.95203 7.87783 6.97054C7.83313 6.98906 7.78522 6.99858 7.73684 6.99858H0.368421C0.320039 6.99858 0.272131 6.98906 0.227433 6.97054C0.182734 6.95203 0.142119 6.9249 0.107908 6.8907C0.073697 6.85649 0.0465594 6.81589 0.0280445 6.7712C0.00952959 6.72651 -2.26789e-09 6.67861 0 6.63024V5.89354C-2.26789e-09 5.84517 0.00952959 5.79727 0.0280445 5.75258C0.0465594 5.70789 0.073697 5.66729 0.107908 5.63308C0.142119 5.59888 0.182734 5.57175 0.227433 5.55324C0.272131 5.53472 0.320039 5.5252 0.368421 5.5252H7.73684ZM13.6316 0C13.68 0 13.7279 0.00952753 13.7726 0.0280387C13.8173 0.0465498 13.8579 0.0736822 13.8921 0.107886C13.9263 0.14209 13.9534 0.182696 13.972 0.227386C13.9905 0.272076 14 0.319975 14 0.368347V1.10504C14 1.15341 13.9905 1.20131 13.972 1.246C13.9534 1.29069 13.9263 1.3313 13.8921 1.3655C13.8579 1.3997 13.8173 1.42684 13.7726 1.44535C13.7279 1.46386 13.68 1.47339 13.6316 1.47339H0.368421C0.320039 1.47339 0.272131 1.46386 0.227433 1.44535C0.182734 1.42684 0.142119 1.3997 0.107908 1.3655C0.073697 1.3313 0.0465594 1.29069 0.0280445 1.246C0.00952959 1.20131 -2.26789e-09 1.15341 0 1.10504V0.368347C-2.26789e-09 0.319975 0.00952959 0.272076 0.0280445 0.227386C0.0465594 0.182696 0.073697 0.14209 0.107908 0.107886C0.142119 0.0736822 0.182734 0.0465498 0.227433 0.0280387C0.272131 0.00952753 0.320039 0 0.368421 0H13.6316Z"
                      fill="#ADBCCF"
                    />
                  </svg>
                </div>
                {["Hitting", "Players", "Time"].map((item: string) => (
                  <button
                    key={item}
                    className={clsx(
                      "button px-[12px] py-[9px] border border-[#383F47] rounded-[6px] w-min-[54px]",
                      sortBy === item
                        ? "bg-[#FFC42F] text-black"
                        : "bg-[#1A1E24]"
                    )}
                    onClick={() => setSortBy(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[20px] py-[50px] px-[20px]">
            {poolList.map((item: any) => (
              <Market key={item.id} data={item} />
            ))}
            {loading && (
              <>
                <MarketLoading />
                <MarketLoading />
              </>
            )}
            <NextBtn
              onClick={() => {
                onQueryPoolList(-1);
              }}
              className={clsx(
                "absolute left-0 bottom-[-20px] rotate-180",

                pageRef.current !== 0 ? "button" : "opacity-50"
              )}
            />
            <NextBtn
              onClick={() => {
                onQueryPoolList(1);
              }}
              className={clsx(
                "absolute right-0 bottom-[-20px]",
                hasMore ? "button" : "opacity-50"
              )}
            />
          </div>
        </div>
        <MoreMarketBtn
          className="absolute left-[50%] translate-x-[-50%] bottom-[-54px]"
          onClick={onClose}
        />
      </div>
    </motion.div>
  );
}

const NextBtn = ({
  onClick,
  className
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      onClick={onClick}
      className={className}
    >
      <rect width="51" height="51" rx="10" fill="#FFC42F" />
      <path
        d="M35.9263 22.3396C37.9905 23.941 37.9905 27.059 35.9263 28.6604L22.4519 39.1141C19.8237 41.153 16 39.28 16 35.9537L16 15.0463C16 11.72 19.8238 9.84698 22.4519 11.8859L35.9263 22.3396Z"
        fill="#2B3337"
        stroke="#FFF79E"
      />
    </svg>
  );
};
