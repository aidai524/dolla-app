export default function BidBg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="169"
      viewBox="0 0 1512 169"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <g filter="url(#filter0_d_1532_20270)">
        <path
          d="M0 82.0005C0 82.0005 364.5 31.5 756 31.5C1147.5 31.5 1512 82.0005 1512 82.0005V138.001H0V82.0005Z"
          fill="url(#paint0_radial_1532_20270)"
        />
        <path
          d="M756 31C951.77 31 1140.79 43.626 1280.86 56.252C1350.89 62.565 1408.7 68.8784 1448.99 73.6133C1469.13 75.9807 1484.9 77.9539 1495.64 79.335C1501 80.0255 1505.11 80.5675 1507.88 80.9375C1509.26 81.1225 1510.31 81.2647 1511.01 81.3604C1511.36 81.4082 1511.63 81.4445 1511.8 81.4688L1512.05 81.5029C1512.06 81.5037 1512.06 81.5045 1512.06 81.5049C1512.07 81.5053 1512.07 81.5118 1512 82.001L1512.07 81.5049L1512.5 81.5654V138.501H-0.5V81.5654L-0.0683594 81.5049L0 82.001C-0.067772 81.5118 -0.067188 81.5053 -0.0644531 81.5049C-0.0616629 81.5045 -0.0573332 81.5037 -0.0517578 81.5029L0.197266 81.4688C0.374148 81.4445 0.639233 81.4082 0.990234 81.3604C1.69224 81.2647 2.7401 81.1225 4.12305 80.9375C6.8891 80.5675 10.9969 80.0255 16.3633 79.335C27.0964 77.9539 42.8656 75.9807 63.0117 73.6133C103.305 68.8784 161.106 62.565 231.143 56.252C371.214 43.626 560.23 31 756 31Z"
          stroke="url(#paint1_linear_1532_20270)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1532_20270"
          x="-31"
          y="0.5"
          width="1574"
          height="168.5"
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
            result="effect1_dropShadow_1532_20270"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1532_20270"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_1532_20270"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(756 32) rotate(90) scale(60.2448 682.905)"
        >
          <stop stopColor="#312821" />
          <stop offset="1" stopColor="#0A070B" />
        </radialGradient>
        <linearGradient
          id="paint1_linear_1532_20270"
          x1="756"
          y1="31.5"
          x2="756"
          y2="132.741"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#614D2D" />
          <stop offset="1" stopColor="#C79E5C" />
        </linearGradient>
      </defs>
    </svg>
  );
}
