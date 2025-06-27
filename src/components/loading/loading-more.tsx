import Loading from "@/components/icons/loading";

interface LoadingMoreProps {
  loading?: boolean;
  hasMore?: boolean;
  className?: string;
}

export default function LoadingMore({
  loading = false,
  hasMore = true,
  className = ""
}: LoadingMoreProps) {
  if (!hasMore) {
    return;
  }

  if (!loading) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center py-[20px] text-[#5E6B7D] ${className}`}
    >
      <Loading size={20} />
      <span className="ml-[8px] text-[14px] ">loading...</span>
    </div>
  );
}
