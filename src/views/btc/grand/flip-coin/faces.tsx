import { FlipCoinBg } from "./bg";
import { addThousandSeparator } from "@/utils/format/number";

export const FrontFace = ({ size = 62, thickness }: any) => {
  return (
    <div
      style={{
        transform: `translateZ(${thickness / 2}px)`
      }}
      className="absolute top-0 left-0 w-full h-full rounded-full backface-hidden flex items-center justify-center"
    >
      <FlipCoinBg size={size} className="absolute top-0 left-0 w-full h-full" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size * 0.42}
        height={size * 0.42}
        viewBox="0 0 94 94"
        fill="none"
        className="relative z-[2]"
      >
        <path
          d="M47 1C72.4051 1 93 21.5949 93 47C93 72.4051 72.4051 93 47 93C21.5949 93 1 72.4051 1 47C1 21.5949 21.5949 1 47 1ZM47 18C30.9837 18 18 30.9837 18 47C18 63.0163 30.9837 76 47 76C63.0163 76 76 63.0163 76 47C76 30.9837 63.0163 18 47 18Z"
          fill="url(#paint0_linear_77_6)"
        />
        <path
          d="M47 1V1.5C72.129 1.5 92.5 21.871 92.5 47H93H93.5C93.5 21.3188 72.6812 0.5 47 0.5V1ZM93 47H92.5C92.5 72.129 72.129 92.5 47 92.5V93V93.5C72.6812 93.5 93.5 72.6812 93.5 47H93ZM47 93V92.5C21.871 92.5 1.5 72.129 1.5 47H1H0.5C0.5 72.6812 21.3188 93.5 47 93.5V93ZM1 47H1.5C1.5 21.871 21.871 1.5 47 1.5V1V0.5C21.3188 0.5 0.5 21.3188 0.5 47H1ZM47 18V17.5C30.7076 17.5 17.5 30.7076 17.5 47H18H18.5C18.5 31.2599 31.2599 18.5 47 18.5V18ZM18 47H17.5C17.5 63.2924 30.7076 76.5 47 76.5V76V75.5C31.2599 75.5 18.5 62.7401 18.5 47H18ZM47 76V76.5C63.2924 76.5 76.5 63.2924 76.5 47H76H75.5C75.5 62.7401 62.7401 75.5 47 75.5V76ZM76 47H76.5C76.5 30.7076 63.2924 17.5 47 17.5V18V18.5C62.7401 18.5 75.5 31.2599 75.5 47H76Z"
          fill="#CE952B"
        />
        <defs>
          <linearGradient
            id="paint0_linear_77_6"
            x1="47"
            y1="1"
            x2="47"
            y2="93"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C18B00" />
            <stop offset="1" stop-color="#E7B22A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const BackPointsFace = ({ size = 62, points = 100, thickness }: any) => {
  return Number(points) > 0 ? (
    <div
      style={{
        transform: `rotateY(180deg) translateZ(${thickness / 2}px)`
      }}
      className="absolute top-0 left-0 w-full h-full rounded-full backface-hidden flex items-center justify-center"
    >
      <FlipCoinBg size={size} className="absolute top-0 left-0 w-full h-full" />
      <span
        className="text-white font-[AlfaSlabOne] text-[14px] font-bold relative z-[2]"
        style={{
          WebkitTextStroke: "1px #BFA460",
          fontSize: size * 0.2
        }}
      >
        {addThousandSeparator(points.toString())}
      </span>
    </div>
  ) : (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-full backface-hidden"
      style={{
        backgroundImage: "url('/btc/flip-empty.svg')",
        transform: `rotateY(180deg) translateZ(${thickness / 2}px)`
      }}
    />
  );
};
