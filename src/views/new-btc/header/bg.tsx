export default function HeaderBg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="234"
      viewBox="0 0 1512 234"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <g filter="url(#filter0_d_1532_20491)">
        <path
          d="M-9.53674e-07 0H1512V56.5L1026.89 104.239C1015.88 105.323 1006.35 112.384 1002.12 122.608L976.673 183.987C972.028 195.194 961.091 202.5 948.96 202.5H572.944C560.861 202.5 549.958 195.251 545.282 184.11L519.436 122.528C515.164 112.349 505.647 105.338 494.658 104.277L-0.000244141 56.5L-9.53674e-07 0Z"
          fill="url(#paint0_radial_1532_20491)"
          shapeRendering="crispEdges"
        />
        <path
          d="M1512.5 -0.5V56.9531L1512.05 56.998L1026.94 104.737C1016.11 105.803 1006.75 112.745 1002.58 122.799L977.135 184.179C972.413 195.572 961.293 203 948.96 203H572.944C560.66 203 549.574 195.63 544.82 184.303L518.975 122.722C514.774 112.712 505.415 105.818 494.61 104.774L-0.0480957 56.998L-0.500244 56.9541V-0.5H1512.5Z"
          stroke="url(#paint1_linear_1532_20491)"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1532_20491"
          x="-31.0002"
          y="-31"
          width="1574"
          height="264.5"
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
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1532_20491"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1532_20491"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_1532_20491"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(756 203) rotate(-90) scale(87.5 256.122)"
        >
          <stop stopColor="#715B47" />
          <stop offset="1" stopColor="#0A070B" />
        </radialGradient>
        <linearGradient
          id="paint1_linear_1532_20491"
          x1="756"
          y1="0"
          x2="756"
          y2="192.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#614D2D" stopOpacity="0" />
          <stop offset="1" stopColor="#C79E5C" />
        </linearGradient>
      </defs>
    </svg>
  );
}
