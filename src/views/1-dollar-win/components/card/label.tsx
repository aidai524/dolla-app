export default function CardLabel({
  className,
  theme,
  id
}: {
  className?: string;
  theme?: any;
  id: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="231"
      height="35"
      viewBox="0 0 231 35"
      fill="none"
      className={className}
    >
      <g filter={`url(#filter0_d_191_2472_${id})`}>
        <path
          d="M9.36609 5.44532C9.67124 5.13848 10.091 5 10.5237 5L217.501 5C219.108 5 220.059 6.79906 219.154 8.12667L204.738 29.2695C204.366 29.8159 203.747 30.1429 203.086 30.1429H10.5237C10.091 30.1429 9.67123 30.0044 9.36609 29.6975C8.18565 28.5106 5.28564 24.8535 5.28564 17.5714C5.28564 10.2893 8.18565 6.63227 9.36609 5.44532Z"
          fill={`url(#paint0_linear_191_2472_${id})`}
        />
        <path
          d="M217.501 4.75L217.668 4.75586C219.319 4.87198 220.283 6.69696 219.45 8.12598L219.361 8.26758L204.945 29.4102C204.526 30.0249 203.829 30.3926 203.085 30.3926H10.5239C10.1003 30.3926 9.67299 30.2741 9.33057 30.001L9.18896 29.874C7.96852 28.6468 5.03564 24.9282 5.03564 17.5713C5.03568 10.2145 7.96853 6.49574 9.18896 5.26855L9.33057 5.14258C9.67305 4.86928 10.1002 4.75 10.5239 4.75H217.501Z"
          stroke={theme?.borderColor}
          strokeWidth="0.5"
        />
      </g>
      <g filter={`url(#filter1_d_191_2472_${id})`}>
        <path
          d="M204.143 30.1429C227 18.7143 225.857 5 225.857 5H212.143C216.714 8.2381 220.714 15.8571 193.286 30.1429H204.143Z"
          fill={`url(#paint1_linear_191_2472_${id})`}
        />
        <path
          d="M5.28564 17.5714C5.28564 26.7143 9.85707 30.1429 9.85707 30.1429H15.5714C14.619 28.8095 11.5714 24.4286 11.5714 17.5714C11.5714 10.7143 14.619 6.33333 15.5714 5H9.85707C9.85707 5 5.28564 8.42857 5.28564 17.5714Z"
          fill={`url(#paint2_linear_191_2472_${id})`}
        />
        <path
          d="M16.0571 4.75L15.7749 5.14551C14.8335 6.46351 11.8218 10.7919 11.8218 17.5713C11.8218 24.3504 14.8333 28.6788 15.7749 29.9971L16.0571 30.3926H9.77393L9.70752 30.3428L9.85693 30.1426L9.70654 30.3428L9.70557 30.3418L9.68994 30.3301C9.67999 30.3223 9.66593 30.3106 9.64795 30.2959C9.61171 30.2663 9.55897 30.2224 9.49365 30.1641C9.36306 30.0474 9.17929 29.8719 8.95947 29.6338C8.51935 29.157 7.93562 28.4279 7.354 27.4102C6.18974 25.3727 5.03564 22.1866 5.03564 17.5713C5.03567 12.9563 6.18982 9.77086 7.354 7.7334C7.93565 6.71551 8.51932 5.98562 8.95947 5.50879C9.17931 5.27066 9.36308 5.09511 9.49365 4.97852C9.55897 4.92019 9.61171 4.87627 9.64795 4.84668C9.66579 4.83211 9.68002 4.82124 9.68994 4.81348C9.69494 4.80956 9.69879 4.80591 9.70166 4.80371C9.70305 4.80265 9.7047 4.80242 9.70557 4.80176L9.70654 4.80078V4.7998C9.70671 4.79971 9.70828 4.80214 9.84131 4.97949L9.70752 4.7998L9.77393 4.75H16.0571ZM226.087 4.75L226.106 4.97949V4.98047C226.106 4.98117 226.107 4.98228 226.107 4.9834C226.107 4.98554 226.107 4.98851 226.107 4.99219C226.107 4.99989 226.108 5.01128 226.109 5.02539C226.11 5.05402 226.112 5.09634 226.114 5.15039C226.117 5.25848 226.119 5.41641 226.112 5.62012C226.098 6.02788 226.052 6.61944 225.925 7.36328C225.671 8.85154 225.091 10.9486 223.792 13.4023C221.193 18.3127 215.722 24.6325 204.254 30.3662L204.202 30.3926H193.286L193.17 29.9209C200.018 26.3543 204.895 23.2087 208.289 20.4492C211.684 17.688 213.58 15.3238 214.487 13.3252C215.389 11.3359 215.311 9.70607 214.751 8.38281C214.187 7.04946 213.121 5.99927 211.999 5.2041L211.357 4.75H226.087Z"
          stroke={theme.borderColor}
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <filter
          id={`filter0_d_191_2472_${id}`}
          x="0.785645"
          y="0.5"
          width="223.22"
          height="34.1431"
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
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_191_2472"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_191_2472"
            result="shape"
          />
        </filter>
        <filter
          id={`filter1_d_191_2472_${id}`}
          x="0.785645"
          y="0.5"
          width="229.581"
          height="34.1431"
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
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_191_2472"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_191_2472"
            result="shape"
          />
        </filter>
        <linearGradient
          id={`paint0_linear_191_2472_${id}`}
          x1="103.713"
          y1="5"
          x2="103.713"
          y2="30.1429"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={theme?.liner2Colors[0]} />
          <stop offset="0.197115" stopColor={theme?.liner2Colors[1]} />
          <stop offset="0.514423" stopColor={theme?.liner2Colors[2]} />
          <stop offset="0.774038" stopColor={theme?.liner2Colors[3]} />
          <stop offset="1" stopColor={theme?.liner2Colors[4]} />
        </linearGradient>
        <linearGradient
          id={`paint1_linear_191_2472_${id}`}
          x1="115.571"
          y1="5"
          x2="115.571"
          y2="30.1429"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={theme?.liner1Colors[0]} />
          <stop offset="0.283654" stopColor={theme?.liner1Colors[1]} />
          <stop offset="0.774038" stopColor={theme?.liner1Colors[2]} />
          <stop offset="1" stopColor={theme?.liner1Colors[3]} />
        </linearGradient>
        <linearGradient
          id={`paint2_linear_191_2472_${id}`}
          x1="115.571"
          y1="5"
          x2="115.571"
          y2="30.1429"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={theme?.liner1Colors[0]} />
          <stop offset="0.283654" stopColor={theme?.liner1Colors[1]} />
          <stop offset="0.774038" stopColor={theme?.liner1Colors[2]} />
          <stop offset="1" stopColor={theme?.liner1Colors[3]} />
        </linearGradient>
      </defs>
    </svg>
  );
}
