export default function TriIcon({ active }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
    >
      <path
        d="M6.82199 8.81355C6.42431 9.38756 5.57569 9.38756 5.178 8.81355L1.89123 4.06949C1.43175 3.40629 1.9064 2.5 2.71322 2.5L9.28678 2.5C10.0936 2.5 10.5683 3.40629 10.1088 4.0695L6.82199 8.81355Z"
        fill={active ? "#EBFF57" : "#434343"}
      />
    </svg>
  );
}
