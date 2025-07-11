export default function BidBtnBg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="330"
      height="74"
      viewBox="0 0 330 74"
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_dd_1532_20510)">
        <path
          d="M4 11.3797C4 8.31843 6.30471 5.75997 9.35444 5.49385C24.9455 4.13338 74.9914 0.5 164.804 0.5C254.38 0.5 303.342 4.11431 318.673 5.48308C321.714 5.75459 324 8.30733 324 11.3605V60C324 63.3137 321.314 66 318 66H10C6.6863 66 4 63.3137 4 60V11.3797Z"
          fill="url(#paint0_radial_1532_20510)"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_1532_20510"
          x="0"
          y="0.5"
          width="330"
          height="73.5"
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
          <feOffset dx="6" dy="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.394869 0 0 0 0 0.317901 0 0 0 0 0.123523 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1532_20510"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_1532_20510"
            result="effect2_dropShadow_1532_20510"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_1532_20510"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_1532_20510"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(164 30.5) rotate(90) scale(35.5 160)"
        >
          <stop stopColor="#FFEF43" />
          <stop offset="1" stopColor="#FFC42F" />
        </radialGradient>
      </defs>
    </svg>
  );
}
