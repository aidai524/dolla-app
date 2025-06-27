import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface SelectOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function Select({
  options = [],
  onSelect,
  value,
  className,
  placeholder
}: {
  options?: SelectOption[];
  onSelect?: (option: SelectOption, i: number) => void;
  value?: string;
  className?: string;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    () => {
      if (value) {
        return options.find((option) => option.id === value) || null;
      }
      return null;
    }
  );

  // Add event listener when component mounts and remove when unmounts
  useEffect(() => {
    const close = () => {
      setIsOpen(false);
    };
    document.addEventListener("click", close);

    return () => {
      document.removeEventListener("click", close);
    };
  }, [isOpen]);

  useEffect(() => {
    setSelectedOption(options.find((option) => option.id === value) || null);
  }, [value]);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const selectOption = (option: SelectOption, index: number) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option, index);
    }
  };

  return (
    <div className={clsx("relative", className)}>
      <button
        className="button w-full bg-[#191817] rounded-[12px] px-[16px] h-[58px] flex items-center justify-between"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-[10px] text-[14px] font-light">
          {selectedOption ? (
            <>
              {selectedOption.icon}
              <span className="text-white">{selectedOption.name}</span>
            </>
          ) : (
            <span className="text-white/30">
              {placeholder || "Select an option"}
            </span>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          className={clsx(
            "transition-transform duration-300",
            isOpen && "transform rotate-180"
          )}
        >
          <path
            d="M5.82199 6.81355C5.42431 7.38756 4.57569 7.38756 4.178 6.81355L0.891225 2.06949C0.431745 1.40629 0.9064 0.5 1.71322 0.5L8.28678 0.500001C9.0936 0.500001 9.56825 1.40629 9.10877 2.0695L5.82199 6.81355Z"
            fill="#434343"
          />
        </svg>
      </button>

      {isOpen && (
        <motion.div
          className="transform origin-top rounded-[12px] border border-[#434343CC] bg-[#22211F] absolute w-full top-[68px] z-10 py-[14px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {options.map((option, index) => (
            <div
              key={option.id}
              className={clsx(
                "flex items-center gap-[12px] p-[10px_20px] hover:bg-[#00000033] cursor-pointer"
              )}
              onClick={() => selectOption(option, index)}
            >
              {option.icon}
              <span className="text-white">{option.name}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
