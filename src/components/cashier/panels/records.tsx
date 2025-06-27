import Loading from "@/components/icons/loading";
import LoadingMore from "@/components/loading/loading-more";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import clsx from "clsx";
import dayjs from "dayjs";
import { formatAddress } from "@/utils/format/address";
import useUserRecords from "@/hooks/use-user-records";

export default function Records() {
  const { loading, records, hasMore, onQueryRecords } = useUserRecords();

  const { containerRef, isLoading } = useInfiniteScroll(onQueryRecords, {
    loading,
    hasMore,
    threshold: 100
  });

  return (
    <div
      ref={containerRef}
      className="bg-[#232932] px-[6px] h-[300px] overflow-y-auto"
    >
      <div className="px-[5px] h-[45px] flex items-center text-[14px] text-[#5E6B7D]">
        {COLUMNS.map((column) => (
          <div
            key={column.key}
            className={`flex items-center`}
            style={{
              width: column.width,
              justifyContent:
                column.align === "left"
                  ? "flex-start"
                  : column.align === "right"
                  ? "flex-end"
                  : "center"
            }}
          >
            {column.label}
          </div>
        ))}
      </div>
      {records.length === 0 && !loading && (
        <div className="text-[14px] text-[#5E6B7D] w-full h-[100px] flex items-center justify-center">
          No data
        </div>
      )}
      {loading && records.length === 0 && (
        <div className="text-[14px] text-[#5E6B7D] w-full h-[100px] flex items-center justify-center">
          <Loading size={20} />
        </div>
      )}
      {records.length > 0 && (
        <div className="text-[14px]">
          {records.map((record: any) => (
            <div
              key={record.id}
              className={clsx(
                "mb-[6px] flex items-center px-[12px] h-[45px] rounded-[4px] bg-[flex items-center h-[45px] bg-[#161A20] button border border-[#161A20] text-white",
                record.is_winner &&
                  "bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(255,_239,_67,_0.20)_0%,_rgba(255,_196,_47,_0.20)_100%)] border-[#FFC42F] text-[#FFEF43]"
              )}
            >
              {COLUMNS.map((column) => (
                <div
                  key={column.key}
                  className={`flex items-center`}
                  style={{
                    width: column.width,
                    justifyContent:
                      column.align === "left"
                        ? "flex-start"
                        : column.align === "right"
                        ? "flex-end"
                        : "center"
                  }}
                >
                  {column.key === "address" && (
                    <div className="text-[#ADBCCF]">
                      {formatAddress(record[column.key])}
                    </div>
                  )}
                  {column.key === "amount" && (
                    <div
                      className={clsx(
                        record.type === 0 ? "text-[#FFC42F]" : "text-[#57FF70]"
                      )}
                    >
                      ${record[column.key]}
                    </div>
                  )}
                  {column.key === "type" && (
                    <span>{record.type === 0 ? "Deposit" : "Withdraw"}</span>
                  )}
                  {column.key === "date" &&
                    dayjs(record[column.key]).format("HH:mm DD MMM, YYYY")}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {records.length > 0 && (
        <LoadingMore loading={isLoading} hasMore={hasMore} className="w-full" />
      )}
    </div>
  );
}

const COLUMNS = [
  {
    key: "date",
    label: "Date",
    width: "30%",
    align: "left"
  },
  {
    key: "assets",
    label: "Assets",
    width: "25%",
    align: "left"
  },
  {
    key: "type",
    label: "Type",
    width: "15%",
    align: "left"
  },
  {
    key: "address",
    label: "Address",
    width: "15%",
    align: "left"
  },
  {
    key: "amount",
    label: "Amount",
    width: "15%",
    align: "right"
  }
];
