import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export default function ListPrize() {
  const navigate = useNavigate();
  const [, setIsOpen] = useState(false);

  useEffect(() => {
    const close = () => {
      setIsOpen(false);
    };
    document.addEventListener("click", close);
    return () => {
      document.removeEventListener("click", close);
    };
  }, []);

  return (
    <div className="relative group">
      <button
        className="button shrink-0 w-[128px] h-[36px] rounded-[10px] border border-dashed border-[rgba(67,67,67,0.8)] bg-[#191817] text-[#8C8B8B] text-[12px]"
        onClick={(e: any) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        + Create Market
      </button>
      <div className="absolute top-[40px] left-0 w-[179px] h-[110px] rounded-[6px] bg-[#232932] invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {[
          {
            label: "BTC Market",
            icon: <BTCIcon />,
            value: "btc"
          },
          {
            label: "NFT Market",
            icon: <NFTIcon />,
            value: "nft"
          }
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => {
              navigate(`${item.value}/create`);
            }}
            className="button h-[56px] w-full flex justify-center items-center gap-[10px] hover:bg-[#00000033]"
          >
            {item.icon}
            <span className="text-[16px] text-white">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const BTCIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 24C18.6276 24 24 18.6276 24 12C24 5.3724 18.6276 0 12 0C5.3724 0 0 5.3724 0 12C0 18.6276 5.3724 24 12 24ZM17.6472 10.2768C17.4384 11.5404 16.7772 12.1572 15.882 12.3756C17.0724 13.0416 17.646 14.0532 17.0328 15.828C16.2708 18.0528 14.5644 18.2544 12.3048 17.8236L11.7216 20.172L10.4088 19.8468L10.9908 17.4984C10.842 17.4588 10.692 17.424 10.5432 17.3892C10.3368 17.3412 10.1232 17.292 9.912 17.2308L9.33 19.5792L8.0196 19.2552L8.6016 16.9056L5.9904 16.1952L6.6384 14.5344C6.6384 14.5344 7.6248 14.8056 7.6104 14.7888C7.9752 14.8776 8.154 14.6208 8.2272 14.4432L9.1584 10.6788L9.8376 8.0028C9.8664 7.7136 9.7752 7.3344 9.2412 7.1904C9.2772 7.17 8.2812 6.9528 8.2812 6.9528L8.6688 5.3784L11.3604 6.0456L11.9304 3.7452L13.2864 4.0812L12.7164 6.3816C13.0656 6.4584 13.4052 6.5496 13.7556 6.6396L14.3244 4.3392L15.6444 4.6656L15.0588 7.026C16.7232 7.638 17.922 8.5416 17.6472 10.2768ZM11.5272 10.7448C12.3156 10.9824 14.6532 11.6844 15.0468 10.1208C15.414 8.6328 13.3884 8.1792 12.4476 7.968C12.336 7.944 12.24 7.9224 12.1656 7.902L11.4612 10.7256L11.5272 10.7448ZM10.3104 15.3288L10.4244 15.3636C11.3964 15.6516 14.1516 16.4712 14.526 14.9196C14.91 13.4244 12.4332 12.8424 11.3232 12.5808C11.202 12.5532 11.0964 12.528 11.0136 12.5064L10.3104 15.3288Z"
        fill="#FFC42F"
      />
    </svg>
  );
};

const NFTIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="25"
      viewBox="0 0 22 25"
      fill="none"
    >
      <path
        d="M7.52632 12.5C8.1405 12.5 8.72953 12.2606 9.16383 11.8343C9.59812 11.4081 9.84211 10.83 9.84211 10.2273C9.84211 9.62451 9.59812 9.04643 9.16383 8.62021C8.72953 8.19399 8.1405 7.95455 7.52632 7.95455C6.91213 7.95455 6.3231 8.19399 5.88881 8.62021C5.45451 9.04643 5.21053 9.62451 5.21053 10.2273C5.21053 10.83 5.45451 11.4081 5.88881 11.8343C6.3231 12.2606 6.91213 12.5 7.52632 12.5ZM11 0L22 6.25V18.75L11 25L0 18.75V6.25L11 0ZM2.31579 7.56023V17.4398L5.06232 19L14.41 12.2727L19.6842 15.3795V7.56136L11 2.625L2.31579 7.56023Z"
        fill="#57FF70"
      />
    </svg>
  );
};
