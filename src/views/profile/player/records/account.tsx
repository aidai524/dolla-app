import clsx from "clsx";
import GridTable, { GridTableAlign } from "@/components/grid-table";
import dayjs from "dayjs";
import Pagination from "@/components/pagination";

const Account = (props: any) => {
  const { className } = props;

  const columns = [
    {
      dataIndex: "type",
      title: "Type",
      width: 150,
    },
    {
      dataIndex: "assets",
      title: "Assets",
    },
    {
      dataIndex: "valued",
      title: "Valued",
      width: 110,
    },
    {
      dataIndex: "wallet",
      title: "Wallet",
      width: 200,
      render: (record: any) => {
        return (
          <div className="flex items-center gap-[7px]">
            <div className="text-[#BBACA6]">To</div>
            <div className="">{record.wallet}</div>
            <img src="/profile/icon-share.svg" alt="share" className="w-[9px] h-[9px] shrink-0" />
          </div>
        );
      },
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
      type: "Withdraw",
      assets: "1,000 USDC",
      valued: "$1000",
      wallet: "Sdpy...snaHY",
      date: "2021-01-01 17:30:00",
    },
    {
      type: "Withdraw",
      assets: "1,000 USDC",
      valued: "$1000",
      wallet: "Sdpy...snaHY",
      date: "2021-01-01 17:30:00",
    },
    {
      type: "Withdraw",
      assets: "1,000 USDC",
      valued: "$1000",
      wallet: "Sdpy...snaHY",
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

export default Account;
