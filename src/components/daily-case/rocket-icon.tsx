export default function RocketIcon({ className, active }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="45"
      viewBox="0 0 48 45"
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_d_37_12446)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32.3017 10.8911C31.8083 10.9171 31.342 11.1248 30.9926 11.4742L22.452 20.0148L28.1745 25.7373L36.7151 17.1967C37.0645 16.8473 37.2722 16.381 37.2981 15.8876L37.4589 12.8327C37.5213 11.6467 36.5426 10.6679 35.3566 10.7304L32.3017 10.8911ZM30.9683 17.3953C31.918 18.345 33.4578 18.345 34.4075 17.3953C35.3572 16.4456 35.3572 14.9058 34.4075 13.9561C33.4578 13.0064 31.918 13.0064 30.9683 13.9561C30.0186 14.9058 30.0186 16.4456 30.9683 17.3953ZM24.9052 15.9273L21.6352 19.1973L20.0002 17.5623C21.0175 16.763 23.4228 15.3169 24.9052 15.9273ZM30.6274 28.1899C31.4268 27.1725 32.8728 24.7673 32.2624 23.2849L28.9924 26.5549L30.6274 28.1899ZM23 23L25.5 25.5L23.5 28.5C24.6667 28.5 26.5 29.5 26.5 32C29 31.5 31 33 31 35H19C14.5 34.5 10 31 10 24.5C12 23 14 24 14.5 25.5C15.5 24 18 23.5 19.5 25.5L23 23Z"
          fill={active ? "#EBFF57" : "#ABABAB"}
        />
      </g>
      {active && (
        <defs>
          <filter
            id="filter0_d_37_12446"
            x="0"
            y="0.727539"
            width="47.4619"
            height="44.2725"
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
              result="effect1_dropShadow_37_12446"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_37_12446"
              result="shape"
            />
          </filter>
        </defs>
      )}
    </svg>
  );
}
