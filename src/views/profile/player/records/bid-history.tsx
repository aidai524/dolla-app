import clsx from "clsx";
import GridTable, { GridTableAlign } from "@/components/grid-table";
import dayjs from "dayjs";
import Pagination from "@/components/pagination";
import { formatNumber } from "@/utils/format/number";

const BidHistory = (props: any) => {
  const {
    className,
    page,
    loading,
    data,
    hasMore,
    onPageChange
  } = props;

  const columns = [
    {
      dataIndex: "marketId",
      title: "Market ID",
      width: 130,
      render: (record: any) => {
        return (
          <div className="flex items-center gap-[7px]">
            <div className="">#{record.pool_id}</div>
            <img src="/profile/icon-share.svg" alt="share" className="w-[9px] h-[9px] shrink-0" />
          </div>
        );
      },
    },
    {
      dataIndex: "marketSize",
      title: "Market Size",
      width: 160,
      render: (record: any) => {
        return `${formatNumber(record.reward_amount, 4, true)} ${typeof record.reward_token == "string" ? record.reward_token : record.reward_token.symbol}`;
      }
    },
    {
      dataIndex: "purchase_amount",
      title: "Bid",
      width: 170,
    },
    {
      dataIndex: "prize",
      title: "Prize",
      render: (record: any) => {
        return (
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
        );
      }
    },
    {
      dataIndex: "date",
      title: "Date",
      width: 160,
      align: GridTableAlign.Right,
      render: (record: any) => {
        return dayjs(record.updated_at).format("hh:mm D MMM, YYYY");
      },
    },
  ];

  return (
    <div className={clsx("mt-[20px]", className)}>
      <GridTable
        data={data}
        columns={columns}
        loading={loading}
      />
      <div className="flex justify-end items-center pt-[18px]">
        <Pagination
          current={page}
          hasNextPage={hasMore}
          size={10}
          onPrev={onPageChange}
          onNext={onPageChange}
        />
      </div>
    </div>
  );
};

export default BidHistory;
