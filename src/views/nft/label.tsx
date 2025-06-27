const TYPES: Record<string, { text: string; colors: string[] }> = {
  saudi: {
    text: "SAUDI",
    colors: ["#FFEF43", "#FFC42F"]
  },
  redOg: {
    text: "RED OG",
    colors: ["#8F54CE", "#572CB5"]
  },
  basic: {
    text: "BASIC",
    colors: ["#A7A7A7", "#414141"]
  }
};

export default function Label({ type }: { type: string }) {
  const item = TYPES[type];
  return (
    <div className="absolute top-[-6px] left-[-14px] w-[82px] h-[28px] flex justify-center items-center">
      <span className="text-[16px] text-black font-bold relative z-[1]">
        {item.text}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="92"
        height="40"
        viewBox="0 0 92 40"
        fill="none"
        className="absolute top-[-6px] left-[-5px] w-[92px] h-[40px]"
      >
        <g filter="url(#filter0_d_583_2569)">
          <path
            d="M12.9064 8.80247C13.4296 7.13481 14.9751 6 16.7229 6H81.5526C84.2531 6 86.1776 8.62089 85.3691 11.1975L79.0936 31.1975C78.5704 32.8652 77.0249 34 75.2771 34H10.4474C7.74688 34 5.82237 31.3791 6.63086 28.8025L12.9064 8.80247Z"
            fill="url(#paint0_radial_583_2569)"
          />
          <path
            d="M16.7227 6.5H81.5527C83.8419 6.50007 85.4937 8.65253 84.9512 10.8369L84.8916 11.0479L78.6162 31.0479C78.1583 32.5069 76.8066 33.4999 75.2773 33.5H10.4473C8.15805 33.4999 6.5063 31.3475 7.04883 29.1631L7.1084 28.9521L13.3838 8.95215C13.8417 7.49309 15.1934 6.50011 16.7227 6.5Z"
            stroke="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_583_2569"
            x="0.44458"
            y="0"
            width="91.1108"
            height="40"
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
              result="effect1_dropShadow_583_2569"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_583_2569"
              result="shape"
            />
          </filter>
          <radialGradient
            id="paint0_radial_583_2569"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(46 20) rotate(90) scale(14 41)"
          >
            <stop stopColor={item.colors[0]} />
            <stop offset="1" stopColor={item.colors[1]} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
