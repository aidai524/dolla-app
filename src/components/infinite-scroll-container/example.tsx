import { useState, useCallback } from "react";
import InfiniteScrollContainer from "./index";

// 示例：如何在其他组件中使用无限滚动
export default function ExampleInfiniteScroll() {
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`)
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // 模拟API请求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newItems = Array.from(
      { length: 10 },
      (_, i) => `Item ${items.length + i + 1}`
    );

    // 模拟数据到达上限
    if (items.length >= 50) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...newItems]);
    }

    setLoading(false);
  }, [items.length, loading, hasMore]);

  return (
    <div className="p-[20px]">
      <h2 className="text-[20px] text-white mb-[16px]">无限滚动示例</h2>

      <InfiniteScrollContainer
        onLoadMore={loadMore}
        loading={loading}
        hasMore={hasMore}
        className="max-h-[400px] overflow-y-auto"
        threshold={50}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="p-[16px] mb-[8px] bg-[#1A1E24] rounded-[6px] text-white"
          >
            {item}
          </div>
        ))}
      </InfiniteScrollContainer>
    </div>
  );
}
