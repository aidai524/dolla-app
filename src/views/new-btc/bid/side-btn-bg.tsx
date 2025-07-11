export default function SideBtnBg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="323"
      height="60"
      viewBox="0 0 323 60"
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_i_1532_20496)">
        <path
          d="M13.0331 19.4948C13.5328 17.9803 14.8349 16.912 16.4236 16.7721C30.4487 15.5372 99.6732 9.57224 167.928 6C234.091 2.53722 301.166 1.32272 317.989 1.05896C320.218 1.02401 322 2.82257 322 5.05185V55C322 57.2091 320.209 59 318 59H5.5317C2.80666 59 0.879323 56.3346 1.73308 53.7468L13.0331 19.4948Z"
          fill="#0F1218"
        />
      </g>
      <path
        d="M317.981 0.558594C320.497 0.519154 322.5 2.55073 322.5 5.05176V55C322.5 57.4853 320.485 59.5 318 59.5H5.53125C2.46582 59.4997 0.297385 56.501 1.25781 53.5898L12.5586 19.3379C13.1185 17.6412 14.5849 16.4325 16.3799 16.2744C30.4069 15.0393 99.6386 9.07368 167.902 5.50098C234.075 2.03774 301.156 0.822392 317.981 0.558594Z"
        stroke="#8D5D04"
      />
      <defs>
        <filter
          id="filter0_i_1532_20496"
          x="0.527893"
          y="0.0583496"
          width="322.472"
          height="59.9417"
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
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.938534 0 0 0 0 0.262414 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_1532_20496"
          />
        </filter>
      </defs>
    </svg>
  );
}
