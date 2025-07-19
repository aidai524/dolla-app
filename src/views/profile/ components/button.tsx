import clsx from "clsx";

const ProfileButton = (props: any) => {
  const { className, children, type = "primary", htmlType = "button", ...restProps } = props;

  return (
    <button
      type={htmlType}
      className={clsx(
        "shrink-0 font-[SpaceGrotesk] cursor-pointer flex justify-center items-center px-[17px] h-[32px] rounded-[8px]",
        type === "default" && "border border-[#6A5D3A] text-white text-[14px] px-[10px] bg-black/20 [background-image:none]",
        type === "primary" && "text-[16px] text-black font-[500] bg-[linear-gradient(180deg,_#FFF698_0%,_#FFC42F_100%)]",
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default ProfileButton;
