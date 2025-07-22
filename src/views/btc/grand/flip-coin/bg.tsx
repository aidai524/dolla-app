export const FlipCoinBg = ({ size, className }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 214 214"
      fill="none"
      className={className}
    >
      <circle
        cx="106.801"
        cy="107.038"
        r="104.731"
        fill="#FFD364"
        stroke="#DD9000"
        strokeWidth="3"
      />
      <g filter="url(#filter0_i_77_3)">
        <circle
          cx="106.801"
          cy="107.038"
          r="82.6242"
          fill="url(#paint0_linear_77_3)"
        />
      </g>
      <circle
        cx="106.801"
        cy="107.038"
        r="81.1242"
        stroke="#DD9000"
        strokeWidth="3"
      />
      <defs>
        <filter
          id="filter0_i_77_3"
          x="24.1768"
          y="24.4134"
          width="165.248"
          height="165.248"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_77_3"
          />
        </filter>
        <linearGradient
          id="paint0_linear_77_3"
          x1="24.1768"
          y1="107.038"
          x2="189.425"
          y2="107.038"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCE52" />
          <stop offset="1" stopColor="#FFE9B2" />
        </linearGradient>
      </defs>
    </svg>
  );
};
