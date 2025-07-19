import clsx from "clsx";
import GridTable, { GridTableAlign } from "@/components/grid-table";
import dayjs from "dayjs";
import Pagination from "@/components/pagination";

const BidHistory = (props: any) => {
  const { className } = props;

  const columns = [
    {
      dataIndex: "marketId",
      title: "Market ID",
      width: 130,
      render: (record: any) => {
        return (
          <div className="flex items-center gap-[7px]">
            <div className="">#{record.marketId}</div>
            <img src="/profile/icon-share.svg" alt="share" className="w-[9px] h-[9px] shrink-0" />
          </div>
        );
      },
    },
    {
      dataIndex: "marketSize",
      title: "Market Size",
      width: 160,
    },
    {
      dataIndex: "bid",
      title: "Bid",
      width: 170,
    },
    {
      dataIndex: "prize",
      title: "Prize",
    },
    {
      dataIndex: "date",
      title: "Date",
      width: 160,
      align: GridTableAlign.Right,
      render: (record: any) => {
        return dayjs(record.date).format("hh:mm D MMM, YYYY");
      },
    },
  ];
  // FIXME mock data
  const data = [
    {
      marketId: "0122",
      marketSize: "1 BTC",
      bid: "-1 USDC",
      prize: "100",
      date: "2021-01-01 17:30:00",
    },
    {
      marketId: "0122",
      marketSize: "1 BTC",
      bid: "-1 USDC",
      prize: "100",
      date: "2021-01-01 17:30:00",
    },
    {
      marketId: "0122",
      marketSize: "1 BTC",
      bid: "-1 USDC",
      prize: "100",
      date: "2021-01-01 17:30:00",
    },
  ];

  return (
    <div className={clsx("mt-[20px]", className)}>
      <GridTable
        data={data}
        columns={columns}
      />
      <div className="flex justify-end items-center pt-[18px]">
        <Pagination
          current={1}
          total={100}
          size={10}
          isCurrentSize
          onPrev={() => { }}
          onNext={() => { }}
        />
      </div>
    </div>
  );
};

export default BidHistory;
