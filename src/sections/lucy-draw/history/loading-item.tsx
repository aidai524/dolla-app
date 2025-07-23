import Skeleton from "@/components/skeleton";

export default function LoadingItem() {
  return (
    <div className="px-[20px] py-[8px] flex items-center justify-between">
      <div className="flex items-center gap-[6px]">
        <Skeleton className="w-[24px] h-[26px] rounded-[12px]" />
        <Skeleton className="w-[30px] h-[30px] rounded-full border border-[#DD9000]" />
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
    </div>
  );
}
