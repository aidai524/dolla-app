import clsx from "clsx";
import GridTable, { GridTableAlign } from "@/components/grid-table";
import dayjs from "dayjs";
import Pagination from "@/components/pagination";
import useUserRecords from "@/hooks/use-user-records";
import { formatNumber } from "@/utils/format/number";
import { formatAddress } from "@/utils/format/address";
import chains from "@/config/chains";

const Account = (props: any) => {
  const { className } = props;

  const {
    userRecords,
    userRecordsLoading,
    userRecordsPageIndex,
    hasNextPage,
    onUserRecordsPageChange,
  } = useUserRecords({ isSinglePage: true });

  const columns = [
    {
      dataIndex: "type",
      title: "Type",
      width: 150,
      render: (record: any) => {
        return record.type === 0 ? "Deposit" : "Withdraw";
      }
    },
    {
      dataIndex: "assets",
      title: "Assets",
      render: (record: any) => {
        return (
          <div className="flex items-center gap-[4px]">
            <div className="">{formatNumber(record.amount, 2, true, { isShort: true, isShortUppercase: true })}</div>
            <div className="">{record.token_info?.symbol}</div>
          </div>
        );
      }
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
        const currentChain = Object.values(chains).find((it: any) => it.name.toLowerCase() === record.chain?.toLowerCase());
        let txUrl: any;
        if (currentChain) {
          txUrl = `${currentChain?.blockExplorers?.default?.url}/tx/${record.tx_hash}`;
        }
        return (
          <div className="flex items-center gap-[7px]">
            <div className="text-[#BBACA6]">
              {record.type === 0 ? "From" : "To"}
            </div>
            {
              txUrl ? (
                <a target="_blank" href={txUrl} className="block">
                  {record.type === 0 ? formatAddress(record.from) : formatAddress(record.to)}
                </a>
              ) : (
                <div className="block">
                  {record.type === 0 ? formatAddress(record.from) : formatAddress(record.to)}
                </div>
              )
            }
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

  return (
    <div className={clsx("mt-[20px]", className)}>
      <GridTable
        data={userRecords}
        columns={columns}
        loading={userRecordsLoading}
      />
      <div className="flex justify-end items-center pt-[18px]">
        <Pagination
          current={userRecordsPageIndex}
          hasNextPage={hasNextPage}
          size={20}
          onPrev={onUserRecordsPageChange}
          onNext={onUserRecordsPageChange}
        />
      </div>
    </div>
  );
};

export default Account;
