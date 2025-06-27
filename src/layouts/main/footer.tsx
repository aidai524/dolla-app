import SOCIALS from "./socials";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[56x] px-[16px] flex items-center justify-between">
      <div className="text-[12px]">
        <span className="text-white">234</span>{" "}
        <span className="text-[#5E6B7D]">Total Bets</span>
      </div>
      <div className="flex items-center gap-[16px]">
        <div className="text-[12px] text-[#5E6B7D]">
          Terms of service | Support
        </div>
        <div className="flex items-center gap-[8px]">
          {SOCIALS.map((social) => (
            <a
              href={social.href}
              target="_blank"
              key={social.name}
              className="button w-[36px] h-[36px] rounded-[8px] bg-[#191817] flex items-center justify-center"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
