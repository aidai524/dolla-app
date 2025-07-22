export default function TriIcon({
  className,
  onClick
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="37"
      viewBox="0 0 31 37"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <g filter="url(#filter0_d_1634_6020)">
        <path
          d="M3.12081 11.7572C0.0208498 14.1593 0.0208507 18.8407 3.12081 21.2428L15.825 31.0868C19.7677 34.1419 25.5 31.3318 25.5 26.344L25.5 6.65601C25.5 1.66817 19.7677 -1.14188 15.825 1.91319L3.12081 11.7572Z"
          fill="url(#paint0_radial_1634_6020)"
        />
        <path
          d="M3.12081 11.7572C0.0208498 14.1593 0.0208507 18.8407 3.12081 21.2428L15.825 31.0868C19.7677 34.1419 25.5 31.3318 25.5 26.344L25.5 6.65601C25.5 1.66817 19.7677 -1.14188 15.825 1.91319L3.12081 11.7572Z"
          stroke="#FFF79E"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1634_6020"
          x="0.295898"
          y="0.144043"
          width="30.7041"
          height="36.7119"
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
          <feOffset dx="5" dy="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.218863 0 0 0 0 0.169022 0 0 0 0 0.0431535 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1634_6020"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1634_6020"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_1634_6020"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(16 16.5) scale(19 25.5)"
        >
          <stop stopColor="#FFEF43" />
          <stop offset="1" stopColor="#FFC42F" />
        </radialGradient>
      </defs>
    </svg>
  );
}
