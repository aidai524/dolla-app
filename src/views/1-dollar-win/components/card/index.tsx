import clsx from "clsx";
import LabelIcon from "./label";
import ParticipantIcon from "./participant-icon";
import FrameIcon from "./frame-icon";
import FrameIconRed from "./frame-icon-red";
import FrameIconSaudi from "./frame-icon-saudi";
import TypeIcon from "./type-icon";
import Rare from "./rare";
import TYPES from "./config";
import { useMemo, useRef, useEffect, useState } from "react";
import BidTips from "./bid-tips";
import SoldLayer from "./sold-layer";
import { formatNumber } from "@/utils/format/number";

export default function Card({
  data,
  className,
  onClick,
  from = "list"
}: {
  data: any;
  className?: string;
  onClick?: (data: any) => void;
  from?: string;
}) {
  const type = useMemo(() => {
    if (data?.rarityLevel === 1) return "saudi";
    if (data?.rarityLevel === 2) return "redOg";
    return "basic";
  }, [data]);

  const config = TYPES[type];

  return (
    <div
      className={clsx(
        "rounded-[12px] relative token-card duration-1000",
        className,
        onClick && "button",
        from === "list" ? "w-[228px] h-[320px]" : "w-[349px] h-[512px]"
      )}
      onClick={onClick}
      style={{
        // @ts-ignore
        "--color1": config.colors[0],
        "--color2": config.colors[1]
      }}
    >
      <div className="absolute left-[-10px] top-[-10px] mix-blend-plus-lighter rounded-[12px] overflow-hidden token-card-mask">
        <div
          className="absolute token-card-mask-before rounded-[12px] z-[-1] mix-blend-color shadow-[0_0_3px_2px_#fff,0_0_7px_4px_#fff,0_0_13px_4px_var(--color1),0_0_25px_5px_var(--color1)]"
          style={{ inset: "30px" }}
        />
      </div>
      <CardContent data={data} config={config} type={type} from={from} />
    </div>
  );
}

const CardContent = ({ data, config, type, from }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        root: null, // Use viewport as root
        rootMargin: "50px", // Add margin around viewport
        threshold: 0.1 // Trigger when at least 10% of card is visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-[12px]"
      ref={cardRef}
    >
      {isVisible && (
        <>
          {!!data?.winner && <SoldLayer winner={data.winner} from={from} />}
          {!!data?.new_sold_count && !data?.winner && (
            <BidTips num={data.new_sold_count} from={from} />
          )}
        </>
      )}

      {data?.id && <TypeIcon id={data.id} label={config.label} from={from} />}

      <Rare rare={data?.rarityLevel || 5} id={data.id} from={from} />

      {from === "detail" && (
        <div className="absolute bottom-0 left-0 z-[22] h-[26px] px-[24px] flex items-center justify-between w-full text-[10px] font-light">
          <div>Owner: {data.asset.creater_id}</div>
          <a
            className="flex items-center gap-[4px] button hover:underline"
            href={`https://magiceden.io/item-details/berachain/${data.asset.contract_address}/${data.asset.token_id}`}
            target="_blank"
          >
            <span>View on Magic Eden </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
            >
              <path
                d="M3.625 1H3C1.89543 1 1 1.89543 1 3V8C1 9.10457 1.89543 10 3 10H8C9.10457 10 10 9.10457 10 8V7.375M4.75 6.25L10 1M10 1H7M10 1V4"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      )}

      {type === "basic" && (
        <FrameIcon
          className={clsx(
            "absolute z-[10]",
            from === "list"
              ? "top-[-10px] left-[-10px]"
              : "top-[-6px] left-[-6px]"
          )}
          id={data.id}
          from={from}
        />
      )}
      {type === "redOg" && (
        <FrameIconRed
          className="absolute top-[-6px] left-[-6px] z-[10]"
          id={data.id}
          from={from}
        />
      )}
      {type === "saudi" && (
        <>
          <FrameIconSaudi
            className="absolute top-[-6px] left-[-6px] z-[10]"
            id={data.id}
            from={from}
          />
        </>
      )}
      <div
        className={clsx(
          "w-full h-full absolute z-[1] rounded-[12px] top-0 left-0 bg-cover bg-center",
          config.bg
        )}
      />
      <img
        src={data.asset.image_url}
        className={clsx(
          "absolute z-[3] top-[10px] left-[50%] translate-x-[-50%] w-[208px]",
          from === "list" ? "w-[208px]" : "w-[325px]"
        )}
      />
      <div
        className={clsx(
          "absolute flex items-center w-full left-[0px] z-[11]",
          from === "list"
            ? "bottom-[78px]  h-[35px]"
            : "bottom-[148px]  h-[38px]"
        )}
      >
        <LabelIcon
          className={clsx(
            "absolute top-0 left-0 z-[1]",
            from === "detail" && "scale-x-[1.5] scale-y-[1.4] origin-left"
          )}
          theme={config.name}
          id={data.id}
        />
        <div
          className={clsx(
            "text-black font-bold italic relative z-[2]",
            from === "list" ? "text-[14px] px-[13px]" : "text-[18px] px-[20px]"
          )}
        >
          {/* {data.asset?.name || data.id} */}
          {data.id}
        </div>
      </div>
      <div
        className={clsx(
          "absolute left-[0px] text-white font-bold w-full z-[5]",
          from === "list"
            ? "bottom-[10px] px-[18px]"
            : "bottom-[50px] px-[26px]"
        )}
      >
        <div className="flex justify-between items-center mt-[6px]">
          <div className={clsx(from === "list" ? "text-[8px]" : "text-[12px]")}>
            List/Anchor Price
          </div>
          <div className="flex gap-[4px] items-center">
            <div
              className={clsx(from === "list" ? "text-[10px]" : "text-[14px]")}
            >
              {data.total_prize}/{data.anchor_price}
            </div>
            <img
              src="/currency/bera.webp"
              className={clsx(
                "rounded-full",
                from === "list" ? "w-[16px] h-[16px]" : "w-[21px] h-[21px]"
              )}
            />
          </div>
        </div>
        {from === "list" ? (
          <>
            <div className="flex justify-between items-center mt-[6px]">
              <div className="text-[8px]">Current Pool</div>
              <div className="flex gap-[4px] items-center">
                <div className="text-[10px]">{data.sold_shares}</div>
                <img
                  src="/currency/bera.webp"
                  className="w-[16px] h-[16px] rounded-full"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-[6px]">
              <div className="text-[8px]">Participants</div>
              <div className="flex gap-[4px] items-center">
                <div className="text-[10px]">
                  {data.buyers?.length || data.buyers_count || "-"}
                </div>
                <ParticipantIcon />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mt-[10px]">
              <div className="text-[12px]">The Rarest Trait</div>
              <div className="flex gap-[4px] items-center">
                <div className="text-[14px]">
                  {data.most_expensive_attribute}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-[10px]">
              <div className="text-[12px]">Top Trait Value</div>
              <div className="flex gap-[4px] items-center">
                <div className="text-[14px]">
                  {formatNumber(data.most_expensive_attribute_bera, 2, true)}
                </div>
                <img
                  src="/currency/bera.webp"
                  className={clsx("rounded-full", "w-[21px] h-[21px]")}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
