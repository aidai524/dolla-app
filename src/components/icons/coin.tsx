export default function Coin({ size = 18 }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={0.8 * size}
      viewBox="0 0 12 15"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M0 4.73684C0 2.12076 2.12076 0 4.73684 0H7.10526C9.72135 0 11.8421 2.12076 11.8421 4.73684V10.2632C11.8421 12.8792 9.72135 15 7.10526 15H4.73684C2.12076 15 0 12.8792 0 10.2632V4.73684Z"
        fill="url(#paint0_radial_583_2930)"
      />
      <path
        d="M1 5.10526C1 2.83799 2.79086 1 5 1H7C9.20914 1 11 2.83799 11 5.10526V9.89474C11 12.162 9.20914 14 7 14H5C2.79086 14 1 12.162 1 9.89474V5.10526Z"
        fill="url(#paint1_radial_583_2930)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_583_2930"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(5.92105 7.5) rotate(90) scale(7.5 5.92105)"
        >
          <stop stopColor="#FFEF43" />
          <stop offset="1" stopColor="#FFC42F" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_583_2930"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(6 7.5) rotate(90) scale(6.5 5)"
        >
          <stop stopColor="#FFC42F" />
          <stop offset="1" stopColor="#FFEF43" />
        </radialGradient>
      </defs>
    </svg>
  );
}
