export default function TopBg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="356"
      height="569"
      viewBox="0 0 356 569"
      fill="none"
      className={className}
    >
      <g opacity="0.3" filter="url(#filter0_f_37_9920)">
        <path
          d="M306 518.5C306 518.5 248.693 518.5 178 518.5C107.308 518.5 50 518.5 50 518.5C50 339.284 107.308 1 178 1C248.693 1 306 339.284 306 518.5Z"
          fill="url(#paint0_radial_37_9920)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_37_9920"
          x="0"
          y="-49"
          width="356"
          height="617.5"
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
            stdDeviation="25"
            result="effect1_foregroundBlur_37_9920"
          />
        </filter>
        <radialGradient
          id="paint0_radial_37_9920"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(178 1) rotate(90) scale(649 256)"
        >
          <stop stopColor="#EBFF57" />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
