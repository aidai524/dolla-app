import TriIcon from "@/components/icons/tri";
import Avatar from "@/components/avatar";
import UserLevel from "@/components/user-level";
import dayjs from "@/libs/dayjs";
import Loading from "@/components/icons/loading";

const COLUMNS = [
  { key: "player", sort: false, label: "Players", width: "40%", align: "left" },
  {
    key: "shares",
    sort: false,
    label: "Tickets",
    width: "25%",
    align: "right"
  },
  { key: "joined", sort: true, label: "Joined", width: "35%", align: "right" }
];

export default function Players({
  players = [],
  data,
  loading
}: {
  players: any;
  data: any;
  loading: boolean;
}) {
  return (
    <div className="px-[20px] mt-[50px]">
      <div className="flex items-center px-[14px] mb-[8px]">
        {COLUMNS.map((column) => (
          <div
            className="flex items-center gap-[4px]"
            key={column.key}
            style={{ width: column.width, justifyContent: column.align }}
          >
            {column.key === "player" && (
              <div className="text-[12px] text-white">
                {players.length || "0"}
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

      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <Loading size={20} />
        </div>
      ) : !players.length ? (
        <div className="flex justify-center items-center h-[200px]">
          <div className="text-[14px] text-white">No data</div>
        </div>
      ) : (
        players.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center px-[14px] h-[50px] rounded-[12px] bg-[#191817] mb-[4px]"
          >
            {COLUMNS.map((column: any) => {
              if (column.key === "player") {
                return (
                  <div
                    className="flex items-center"
                    style={{
                      width: column.width,
                      justifyContent: column.align
                    }}
                    key={column.key}
                  >
                    <Avatar size={32} src={item.user_avatar} />
                    <div className="ml-[12px] mr-[5px] text-[12px] text-white">
                      {item.user_name}
                    </div>
                    <UserLevel level={1} />
                  </div>
                );
              }
              if (column.key === "shares") {
                return (
                  <div
                    className="flex items-center gap-[4px]"
                    style={{
                      width: column.width,
                      justifyContent: column.align
                    }}
                    key={column.key}
                  >
                    <div className="text-[12px] text-white">
                      {item.quantity || item.total_quantity}
                    </div>
                    <img
                      className="w-[16px] h-[16px] rounded-full"
                      src={data?.currencyIcon}
                    />
                  </div>
                );
              }
              if (column.key === "joined") {
                return (
                  <div
                    className="text-[10px] text-white"
                    style={{ width: column.width, textAlign: column.align }}
                    key={column.key}
                  >
                    {dayjs(item.created_at).fromNow()}
                  </div>
                );
              }
            })}
          </div>
        ))
      )}
    </div>
  );
}
