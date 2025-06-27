import { useMemo, useRef, useEffect } from "react";
import Card from "../card";
import CardLoading from "../card/loading";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import "./index.css";

export default function Draws({
  draws = [],
  running,
  onEnd,
  onFetchDraws,
  updatedDraws,
  displayIndexs,
  drawsLoading
}: {
  draws: any[];
  running: boolean;
  onEnd: () => void;
  onFetchDraws: (refresh?: boolean) => Promise<void>;
  updatedDraws: any;
  displayIndexs: number[];
  drawsLoading: boolean;
}) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const lists = useMemo(() => {
    const len = Math.floor((window.innerWidth - 404) / 278);
    const _lists: any = Array.from({ length: len }, () => []);
    for (let i = 0; i < draws.length; i++) {
      _lists[i % len].push(draws[i]);
    }

    return _lists;
  }, [draws]);

  const onRunning = async () => {
    await onFetchDraws(true);

    timer.current = setTimeout(() => {
      onEnd();
    }, 200 * lists.length + 400);
  };

  useEffect(() => {
    if (running) {
      onRunning();
    } else {
      clearTimeout(timer.current as NodeJS.Timeout);
    }
  }, [running]);

  return lists.map((list: any, index: number) => (
    <List
      key={index}
      list={list}
      index={index}
      running={running}
      updatedDraws={updatedDraws}
      displayIndexs={displayIndexs}
      drawsLoading={drawsLoading}
    />
  ));
}

const List = ({
  list,
  index,
  running,
  updatedDraws = {},
  displayIndexs = [],
  drawsLoading = true
}: {
  list: any[];
  index: number;
  running: boolean;
  updatedDraws: any;
  displayIndexs: number[];
  drawsLoading: boolean;
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const mergedList = useMemo(() => {
    if (!listRef.current) return list;

    if (running) {
      listRef.current.style.transform = `translateY(${-(index * 100) - 300}%)`;
      listRef.current.style.animationDuration = `${index * 0.2 + 0.6}s`;
      listRef.current.style.animationName = "move-up";
      listRef.current.style.animationFillMode = "forwards";
    } else {
      listRef.current.style.animationName = "none";
      listRef.current.style.transform = `translateY(0%)`;
    }

    return running
      ? Array((index + 1) * 3 + 1)
          .fill(list)
          .flat()
      : list;
  }, [list, index, running]);

  return (
    <div ref={listRef} className={clsx(!(index % 2) && "mt-[50px]")}>
      {mergedList.map((draw: any, j: number) =>
        j >= displayIndexs[0] && j <= displayIndexs[1] ? (
          <Card
            key={j}
            data={{
              ...draw,
              ...(updatedDraws[draw.id] || {})
            }}
            onClick={() => {
              navigate(`/detail/${draw.id}`);
            }}
            className={clsx(j !== 0 && "mt-[20px]")}
            from="list"
          />
        ) : (
          <div className="w-[228px] h-[320px] mt-[20px]" key={j} />
        )
      )}
      {drawsLoading && !running && <CardLoading className="mt-[20px]" />}
    </div>
  );
};




