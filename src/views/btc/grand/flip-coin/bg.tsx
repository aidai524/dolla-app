export const FlipCoinBg = ({ size, className }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 63 62"
      fill="none"
      className={className}
    >
      <circle
        cx="31.3075"
        cy="30.9434"
        r="30.4434"
        fill="#FFD364"
        stroke="#DD9000"
      />
      <g filter="url(#filter0_i_63_35)">
        <circle
          cx="30.8196"
          cy="30.9431"
          r="24.0671"
          fill="url(#paint0_linear_63_35)"
        />
      </g>
      <circle cx="30.8196" cy="30.9431" r="23.5671" stroke="#DD9000" />
      <defs>
        <filter
          id="filter0_i_63_35"
          x="6.75256"
          y="6.87598"
          width="48.1342"
          height="48.1342"
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
            result="effect1_innerShadow_63_35"
          />
        </filter>
        <linearGradient
          id="paint0_linear_63_35"
          x1="6.75256"
          y1="30.9431"
          x2="54.8867"
          y2="30.9431"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCE52" />
          <stop offset="1" stopColor="#FFE9B2" />
        </linearGradient>
      </defs>
    </svg>
  );
};
