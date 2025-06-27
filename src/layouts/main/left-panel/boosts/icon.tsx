export default function BoostsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="57"
      viewBox="0 0 50 57"
      fill="none"
      className={className}
    >
      <g opacity="0.3" filter="url(#filter0_d_16_3344)">
        <path
          d="M19.2856 31.7299L11.9922 29.9256C11.04 29.69 10.6173 28.581 11.1746 27.7818L23.0952 10.6844C23.2564 10.4531 23.4848 10.2761 23.7499 10.177C24.0151 10.0779 24.3045 10.0613 24.58 10.1294L36.8094 13.1549C37.7743 13.3936 38.1919 14.5271 37.6081 15.3246L30.8437 24.5661L38.7877 26.5314C39.956 26.8204 40.241 28.3422 39.2548 29.0234L14.326 46.2434C13.1141 47.0807 11.5884 45.7179 12.2966 44.4309L19.2856 31.7299Z"
          fill="#EBFF57"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_16_3344"
          x="0.925293"
          y="0.0881958"
          width="48.9282"
          height="56.4128"
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
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.921569 0 0 0 0 1 0 0 0 0 0.341176 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_16_3344"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_16_3344"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
