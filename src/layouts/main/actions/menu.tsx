export default function Menu({ onClick }: { onClick: () => void }) {
  return (
    <button className="button" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="12"
        viewBox="0 0 15 12"
        fill="none"
      >
        <path
          d="M1 1.5H14"
          stroke="#ABABAB"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M1 6H14"
          stroke="#ABABAB"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M1 10.5H14"
          stroke="#ABABAB"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
