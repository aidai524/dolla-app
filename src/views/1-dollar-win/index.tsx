import Switcher from "./components/switcher";
import Draws from "./components/draws";
import { useState, useRef, useEffect } from "react";
import { useDebounceFn } from "ahooks";
import { useHome } from "@/contexts/home";
import { useLoaderData } from "react-router-dom";

function OneDollarWin({}: { data: any }) {
  const {
    draws,
    drawsLoading,
    fetchDraws,
    newHints,
    setIsFirstPage,
    updatedDraws,
    setDrawsLoading,
    setInitialDraws
  } = useHome();
  const [running, setRunning] = useState(false);
  const [displayIndexs, setDisplayIndexs] = useState<number[]>([0, 1000]);

  const data = useLoaderData();

  const listRef = useRef<HTMLDivElement>(null);

  const { run: scrollDebounce } = useDebounceFn(
    () => {
      if (!listRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;

      setIsFirstPage(scrollTop < 228);

      if (scrollHeight - scrollTop - clientHeight <= 300) {
        setDrawsLoading(true);
      }

      if (scrollHeight - scrollTop - clientHeight <= 500) {
        console.log("Scrolled to bottom, fetch more draws");

        fetchDraws(false);
      }

      const t = Math.floor(scrollTop / 362);
      const x = Math.ceil(clientHeight / 362);
      const _i = [Math.floor(t - 10 * x), Math.ceil(10 * x + t)];

      setDisplayIndexs(_i);
    },
    { wait: 500 }
  );

  useEffect(() => {
    if (draws.length > 0) return;
    if (data) {
      if (data.success) {
        setInitialDraws(data.data);
        setRunning(true);
      }
      setDrawsLoading(false);
    } else {
      setDrawsLoading(true);
    }
  }, [data]);

  return (
    <div className="p-[20px] relative w-full">
      <div className="relative">
        <div className="absolute z-[2] top-0 left-0 w-full h-[100px] bg-[linear-gradient(to_bottom,_rgba(0,0,0,1)_0%,_rgba(0,0,0,0)_100%)]" />
        <div
          className="relative z-[1] flex gap-[50px] justify-center h-[calc(100vh-140px)] overflow-y-auto"
          onScroll={scrollDebounce}
          ref={listRef}
        >
          <Draws
            draws={draws}
            running={running}
            onEnd={() => {
              setRunning(false);
            }}
            onFetchDraws={fetchDraws}
            updatedDraws={updatedDraws}
            displayIndexs={displayIndexs}
            drawsLoading={drawsLoading}
          />
        </div>
        <div className="absolute z-[2] bottom-0 left-0 w-full h-[100px] bg-[linear-gradient(to_top,_rgba(0,0,0,1)_0%,_rgba(0,0,0,0)_100%)]" />
      </div>
      <Switcher
        onClick={() => {
          listRef.current?.scrollTo({
            top: 0
          });
          if (running) {
            setRunning(false);
            setTimeout(() => {
              setRunning(true);
            }, 100);
          } else {
            setRunning(true);
          }
        }}
        newHints={newHints}
      />
    </div>
  );
}

export default function OneDollarWinWrapper() {
  const data = useLoaderData();

  return <OneDollarWin data={data} />;
}
