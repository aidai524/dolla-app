import TriIcon from "@/components/icons/tri";
import Avatar from "@/components/avatar";
import UserLevel from "@/components/user-level";
import dayjs from "@/libs/dayjs";

const COLUMNS = [
  { key: "player", sort: false, label: "Players", width: "40%", align: "left" },
  { key: "chance", sort: true, label: "Chace", width: "20%", align: "center" },
  {
    key: "shares",
    sort: false,
    label: "Shares",
    width: "20%",
    align: "center"
  },
  { key: "joined", sort: true, label: "Joined", width: "20%", align: "right" }
];

export default function Players({ data }: { data: any }) {
  return (
    <div className="px-[40px] mt-[50px]">
      <div className="flex items-center px-[14px] mb-[8px]">
        {COLUMNS.map((column) => (
          <div
            className="flex items-center gap-[4px]"
            key={column.key}
            style={{ width: column.width, justifyContent: column.align }}
          >
            {column.key === "player" && (
              <div className="text-[12px] text-white">
                {data?.buyers.length || "0"}
              </div>
            )}
            <div className="text-[12px] text-[#ABABAB] font-light">
              {column.label}
            </div>
            {column.sort && (
              <button className="button">
                <TriIcon />
              </button>
            )}
          </div>
        ))}
      </div>
      {data?.buyers.map((item: any, index: number) => (
        <div
          key={index}
          className="flex items-center px-[14px] h-[50px] rounded-[12px] bg-[#191817] mb-[4px]"
        >
          {COLUMNS.map((column: any) => (
            <>
              {column.key === "player" && (
                <div
                  className="flex items-center"
                  style={{ width: column.width, justifyContent: column.align }}
                  key={column.key}
                >
                  <Avatar size={32} src={item.user_avatar} />
                  <div className="ml-[12px] mr-[5px] text-[12px] text-white">
                    {item.user_name}
                  </div>
                  <UserLevel level={1} />
                </div>
              )}
              {column.key === "chance" && (
                <div
                  className="text-[10px] text-white"
                  style={{ width: column.width, textAlign: column.align }}
                  key={column.key}
                >
                  {item.winning_probability.toFixed(2)}%
                </div>
              )}
              {column.key === "shares" && (
                <div
                  className="flex items-center gap-[4px]"
                  style={{ width: column.width, justifyContent: column.align }}
                  key={column.key}
                >
                  <div className="text-[12px] text-white">{item.quantity}</div>
                  <img
                    className="w-[16px] h-[16px] rounded-full"
                    src={data?.currencyIcon}
                  />
                </div>
              )}
              {column.key === "joined" && (
                <div
                  className="text-[10px] text-white"
                  style={{ width: column.width, textAlign: column.align }}
                  key={column.key}
                >
                  {dayjs(item.purchase_time).fromNow()}
                </div>
              )}
            </>
          ))}
        </div>
      ))}
    </div>
  );
}
