import clsx from "clsx";

export default function TypeIcon({
  id,
  label,
  from
}: {
  id: string;
  label: any;
  from: string;
}) {
  return (
    <div
      className={clsx(
        "absolute z-[20] top-[8px] left-[8px] flex items-center justify-center",
        from === "list" ? "w-[66px] h-[30px]" : "w-[87px] h-[29px]"
      )}
    >
      <span
        className={clsx(
          " font-bold relative z-[2]",
          from === "list" ? "text-[10px]" : "text-[14px] top-[10px]",
          label.textCls
        )}
      >
        {label.text}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="66"
        height="30"
        viewBox="0 0 66 30"
        fill="none"
        className={clsx(
          "absolute",
          from === "detail"
            ? "scale-[1.3181818181818182] left-[10px] top-[10px]"
            : "left-0 top-0"
        )}
      >
        <g filter={`url(#filter0_d_191_2384_${id})`}>
          <path
            d="M10.1101 6.54195C10.3725 5.70931 11.1446 5.14307 12.0176 5.14307H58.8441C60.1954 5.14307 61.1578 6.45537 60.7516 7.74418L55.8897 23.1728C55.6273 24.0054 54.8552 24.5716 53.9822 24.5716H7.15567C5.80439 24.5716 4.84201 23.2593 5.24814 21.9705L10.1101 6.54195Z"
            fill={`url(#paint0_linear_191_2384_${id})`}
          />
          <path
            d="M58.8445 4.89307C60.3169 4.8933 61.3784 6.2785 61.0281 7.68311L60.99 7.81885L56.1277 23.2476C55.8325 24.1843 54.9643 24.8218 53.9822 24.8218H7.15601C5.63581 24.8218 4.55262 23.3449 5.00952 21.895L9.87183 6.46729L9.93335 6.29443C10.2756 5.45281 11.0968 4.89318 12.0173 4.89307H58.8445Z"
            stroke={label.borderColor}
            strokeWidth="0.5"
          />
        </g>
        <defs>
          <filter
            id={`filter0_d_191_2384_${id}`}
            x="0.653809"
            y="0.643066"
            width="64.6921"
            height="28.4287"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_191_2384"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_191_2384"
              result="shape"
            />
          </filter>
          <linearGradient
            id={`paint0_linear_191_2384_${id}`}
            x1="30.4674"
            y1="5.14307"
            x2="30.4674"
            y2="24.5716"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={label.linearColors[0]} />
            <stop offset="0.197115" stopColor={label.linearColors[1]} />
            <stop offset="0.514423" stopColor={label.linearColors[2]} />
            <stop offset="0.774038" stopColor={label.linearColors[3]} />
            <stop offset="1" stopColor={label.linearColors[4]} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
