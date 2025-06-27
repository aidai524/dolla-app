import clsx from "clsx";
import dayjs from "dayjs";
import usePlayerHistory from "../hooks/use-player-history";
import Button from "@/components/button";
import Loading from "@/components/icons/loading";
import PoolId from "./pool-id";

export default function History() {
  const { page, loading, data, hasMore, onPageChange } = usePlayerHistory();

  return (
    <div className="h-[564px] w-full bg-[#1A1E24] rounded-[6px] px-[20px] py-[16px] mt-[10px]">
      <div className="pl-[12px] pt-[10px] text-[14px] text-[#5E6B7D]">
        History
      </div>

      <div className="mt-[10px]">
        <div className="px-[12px] h-[45px] flex items-center text-[14px] text-[#5E6B7D]">
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
        {data.length === 0 && !loading && (
          <div className="text-[14px] text-[#5E6B7D] w-full h-[402px] flex items-center justify-center">
            No data
          </div>
        )}
        {loading && (
          <div className="text-[14px] text-[#5E6B7D] w-full  h-[402px] flex items-center justify-center">
            <Loading size={20} />
          </div>
        )}
        {data.length > 0 && (
          <div className="text-[14px] h-[402px]">
            {data.map((record: any) => (
              <div
                key={record.id}
                className={clsx(
                  "mb-[6px] flex items-center px-[12px] h-[45px] rounded-[4px] bg-[flex items-center h-[45px] bg-[#161A20] button border border-[#161A20]",
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
                    {column.key === "pool_id" && <PoolId data={record} />}

                    {column.key === "prize" && (
                      <div className="flex items-center gap-[4px]">
                        {record.rewardTokenInfo.icon && (
                          <img
                            className="w-[20px] h-[20px] rounded-[4px]"
                            src={record.rewardTokenInfo.icon}
                            alt="coin"
                          />
                        )}
                        {record.nft_ids ? (
                          <span className="font-semibold">
                            #{record.rewardTokenInfo.token_id}
                          </span>
                        ) : (
                          <span className="font-semibold">
                            {record.rewardTokenInfo.name}
                          </span>
                        )}
                      </div>
                    )}
                    {column.key === "status" && (
                      <>
                        <div
                          className={clsx(
                            "flex items-center gap-[4px] font-medium",
                            record.status === 2 && "!text-[#FF5757]"
                          )}
                        >
                          <span>
                            {record.status === 1 ? "Success" : "Failed"}
                          </span>
                          <a
                            href={`https://berascan.com/tx/${record.tx_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            Tx
                          </a>
                        </div>
                        {record.status === 3 && (
                          <Button className="w-[52px] h-[26px] text-[12px]">
                            Claim
                          </Button>
                        )}
                        {record.status === 4 && "Refunded"}
                      </>
                    )}

                    {["purchase_amount"].includes(column.key) &&
                      record[column.key]}
                    {column.key === "date" &&
                      dayjs(record[column.key]).format("HH:mm DD MMM, YYYY")}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination page={page} hasMore={hasMore} onPageChange={onPageChange} />
    </div>
  );
}

const Pagination = ({
  page,
  hasMore,
  onPageChange
}: {
  page: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center justify-end mt-[16px]">
      {/* <span className="text-[14px] text-[#5E6B7D]">
        {page} of {total}
      </span> */}
      <div className="flex items-center gap-[10px]">
        <button
          className={clsx(
            "w-[30px] h-[30px] rounded-[4px] bg-[#161A20] ml-[10px] flex items-center justify-center",
            page > 1 ? "button" : "opacity-30"
          )}
          onClick={() => onPageChange(page - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="14"
            viewBox="0 0 7 14"
            fill="none"
          >
            <path
              opacity={page === 1 ? 0.3 : 1}
              d="M6 1L1 7L6 13"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <button
          className={clsx(
            "w-[30px] h-[30px] rounded-[4px] bg-[#161A20] ml-[10px] flex items-center justify-center",
            hasMore ? "button" : "opacity-30"
          )}
          onClick={() => onPageChange(page + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="14"
            viewBox="0 0 7 14"
            fill="none"
          >
            <path
              d="M1 1L6 7L1 13"
              stroke="white"
              strokeWidth="1.5"
              opacity={hasMore ? 1 : 0.3}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const COLUMNS = [
  {
    key: "pool_id",
    label: "Marked ID",
    width: "20%",
    align: "left"
  },
  {
    key: "purchase_amount",
    label: "Bid",
    width: "15%",
    align: "left"
  },
  {
    key: "prize",
    label: "Prize",
    width: "15%",
    align: "left"
  },
  {
    key: "status",
    label: "Status",
    width: "15%",
    align: "left"
  },
  {
    key: "date",
    label: "Date",
    width: "35%",
    align: "right"
  }
];
