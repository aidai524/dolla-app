export default function PointIcon({
  className,
  size = 26
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      <ellipse
        cx="12.9995"
        cy="12.9563"
        rx="12.9995"
        ry="12.9563"
        fill="#6D5000"
      />
      <path d="M14.7335 0H11.267V1.81388H14.7335V0Z" fill="#6D5000" />
      <path
        d="M14.7335 24.1865H11.267V26.0004H14.7335V24.1865Z"
        fill="#6D5000"
      />
      <ellipse
        cx="12.9995"
        cy="12.9563"
        rx="12.9995"
        ry="12.9563"
        fill="#FDC93A"
      />
      <ellipse
        cx="12.9996"
        cy="13.0006"
        rx="10.8329"
        ry="11.2662"
        fill="#6D5000"
      />
      <circle
        cx="13.4328"
        cy="13.0001"
        r="4.33316"
        stroke="#FFC42F"
        strokeWidth="2"
      />
    </svg>
  );
}
