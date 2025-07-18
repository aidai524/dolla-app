export default function Light({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="265"
      height="574"
      viewBox="0 0 265 574"
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_f_1694_7895)">
        <path
          d="M20 554L126.01 -210.265C126.487 -213.7 131.442 -213.722 131.949 -210.292L245 554H20Z"
          fill="url(#paint0_linear_1694_7895)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1694_7895"
          x="0"
          y="-232.853"
          width="265"
          height="806.853"
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
          <feGaussianBlur
            stdDeviation="10"
            result="effect1_foregroundBlur_1694_7895"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1694_7895"
          x1="162.463"
          y1="-294.93"
          x2="162.463"
          y2="576.301"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEEC3" />
          <stop offset="1" stopColor="#FFC42F" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
