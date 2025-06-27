import { ReactNode } from "react";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import LoadingMore from "@/components/loading/loading-more";

interface InfiniteScrollContainerProps {
  children: ReactNode;
  onLoadMore: () => void | Promise<void>;
  loading?: boolean;
  hasMore?: boolean;
  threshold?: number;
  className?: string;
  loadingMoreClassName?: string;
}

export default function InfiniteScrollContainer({
  children,
  onLoadMore,
  loading = false,
  hasMore = true,
  threshold = 100,
  className = "",
  loadingMoreClassName = ""
}: InfiniteScrollContainerProps) {
  const { containerRef, isLoading } = useInfiniteScroll(onLoadMore, {
    loading,
    hasMore,
    threshold
  });

  return (
    <div ref={containerRef} className={className}>
      {children}
      <LoadingMore
        loading={isLoading}
        hasMore={hasMore}
        className={loadingMoreClassName}
      />
    </div>
  );
}
