import Skeleton from "@/components/skeleton";
import clsx from "clsx";

export default function LoadingCard({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "rounded-[12px] relative w-[228px] h-[320px] bg-[#191817] flex flex-col items-center justify-center",
        className
      )}
    >
      <Skeleton className="w-[200px] h-[210px] rounded-[12px]" />
      <Skeleton className="w-[200px] h-[70px] rounded-[12px] mt-[10px]" />
    </div>
  );
}
