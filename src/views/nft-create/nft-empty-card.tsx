export default function NFTEmptyCard() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="160"
      viewBox="0 0 128 160"
      fill="none"
    >
      <rect width="128" height="160" rx="12" fill="#191817" />
      <rect
        opacity="0.05"
        x="12"
        y="12"
        width="104"
        height="104"
        rx="4"
        fill="url(#paint0_linear_22_8350)"
      />
      <rect
        opacity="0.05"
        x="12"
        y="127"
        width="104"
        height="18"
        rx="4"
        fill="url(#paint1_linear_22_8350)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_22_8350"
          x1="12"
          y1="64"
          x2="116"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#999999" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_22_8350"
          x1="12"
          y1="136"
          x2="116"
          y2="136"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#999999" />
        </linearGradient>
      </defs>
    </svg>
  );
}
