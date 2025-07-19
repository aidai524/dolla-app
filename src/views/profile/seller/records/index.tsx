import clsx from "clsx";
import GridTable, { GridTableAlign } from "@/components/grid-table";
import dayjs from "dayjs";
import Pagination from "@/components/pagination";

const Records = (props: any) => {
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
      dataIndex: "type",
      title: "Type",
      width: 160,
    },
    {
      dataIndex: "assets",
      title: "Assets",
      width: 170,
    },
    {
      dataIndex: "valued",
      title: "Valued",
    },
    {
      dataIndex: "date",
      title: "Date",
      width: 160,
      align: GridTableAlign.Right,
      render: (record: any) => {
        return (
          <div className="flex justify-end items-center gap-[11px]">
            <div className="text-[#BBACA6]">
              {dayjs(record.date).format("hh:mm D MMM, YYYY")}
            </div>
            <img src="/profile/icon-share.svg" alt="share" className="w-[9px] h-[9px] shrink-0" />
          </div>
        );
      },
    },
  ];
  // FIXME mock data
  const data = [
    {
      marketId: "0122",
      type: "Created",
      assets: "0.001 BTC",
      valued: "$102",
      date: "2021-01-01 17:30:00",
    },
    {
      marketId: "0123",
      type: "Created",
      assets: "0.002 BTC",
      valued: "$1102",
      date: "2021-01-02 17:30:00",
    },
    {
      marketId: "0124",
      type: "Created",
      assets: "0.003 BTC",
      valued: "$1202",
      date: "2021-01-03 17:30:00",
    },
    {
      marketId: "0125",
      type: "Created",
      assets: "0.004 BTC",
      valued: "$1302",
      date: "2021-01-04 17:30:00",
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

export default Records;
