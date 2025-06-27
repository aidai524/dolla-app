export default function Logo({
  className,
  size = 186
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * 0.3010752688172043}
      viewBox="0 0 186 56"
      fill="none"
      className={className}
    >
      <path
        d="M149.543 50L160.622 7.85266H174.471L185.549 50H177.361L175.073 40.7276H160.02L157.732 50H149.543ZM161.887 33.3819H173.206L168.088 12.8501H167.005L161.887 33.3819Z"
        fill="white"
      />
      <path
        d="M119.8 50V7.85266H127.748V42.7748H147.015V50H119.8Z"
        fill="white"
      />
      <path
        d="M87.1675 50V7.85266H95.1153V42.7748H114.383V50H87.1675Z"
        fill="white"
      />
      <path
        d="M0 50V43.0156H5.53937V14.8371H0V7.85266H17.3406C23.0004 7.85266 27.2954 9.29771 30.2257 12.1878C33.1961 15.0378 34.6813 19.2927 34.6813 24.9525V32.9002C34.6813 38.56 33.1961 42.835 30.2257 45.7251C27.2954 48.5751 23.0004 50 17.3406 50H0ZM13.4872 42.7748H17.4611C20.6723 42.7748 23.0205 41.9318 24.5057 40.2459C25.9909 38.56 26.7335 36.1918 26.7335 33.1411V24.7116C26.7335 21.6208 25.9909 19.2525 24.5057 17.6068C23.0205 15.9209 20.6723 15.0779 17.4611 15.0779H13.4872V42.7748Z"
        fill="white"
      />
      <g filter="url(#filter0_d_658_10014)">
        <path
          d="M43.5459 19.8947C43.5459 12.2209 49.7668 6 57.4406 6H64.388C72.0619 6 78.2827 12.2209 78.2827 19.8947V36.1053C78.2827 43.7791 72.0619 50 64.388 50H57.4406C49.7668 50 43.5459 43.7791 43.5459 36.1053V19.8947Z"
          fill="url(#paint0_radial_658_10014)"
        />
      </g>
      <path
        d="M48.1777 19.8945C48.1777 14.7786 52.325 10.6313 57.4409 10.6313H64.3883C69.5042 10.6313 73.6514 14.7786 73.6514 19.8945V36.105C73.6514 41.2209 69.5042 45.3682 64.3883 45.3682H57.4409C52.325 45.3682 48.1777 41.2209 48.1777 36.105V19.8945Z"
        fill="url(#paint1_radial_658_10014)"
      />
      <defs>
        <filter
          id="filter0_d_658_10014"
          x="37.5459"
          y="0"
          width="46.7368"
          height="56"
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
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.805025 0 0 0 0 0.442927 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_658_10014"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_658_10014"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_658_10014"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(60.9143 28) rotate(90) scale(22 17.3684)"
        >
          <stop stopColor="#FFEF43" />
          <stop offset="1" stopColor="#FFC42F" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_658_10014"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(60.9146 27.9998) rotate(90) scale(17.3684 12.7368)"
        >
          <stop stopColor="#FFC42F" />
          <stop offset="1" stopColor="#FFEF43" />
        </radialGradient>
      </defs>
    </svg>
  );
}
