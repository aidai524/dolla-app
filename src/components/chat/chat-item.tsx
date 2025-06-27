import dayjs from "dayjs";
import UserLevel from "../user-level";

export default function ChatItem({ message, user }: any) {
  return (
    <div className="mb-[28px] flex gap-[10px] px-[8px]">
      <img
        src={user?.avatar}
        className="w-[24px] h-[24px] rounded-[6px] border-[1px] border-[#434343CC] shrink-0"
      />
      <div className="w-[calc(100%-34px)]">
        <div className="flex justify-between">
          <div className="flex items-center gap-[4px]">
            <div className="text-[12px] text-white max-w-[140px] truncate">
              {user?.name || message.from}
            </div>
            {user?.level && <UserLevel level={user.level} />}
          </div>
          <span className="text-[8px] text-[#434343]">
            {dayjs(message.timestamp).format("HH:mm")}
          </span>
        </div>
        <div className="text-[12px] text-[#ABABAB]">{message.text}</div>
      </div>
    </div>
  );
}
