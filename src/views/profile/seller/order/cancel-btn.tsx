import ButtonWithAuth from "@/components/button/button-with-auth";

export default function CancelBtn() {
  return (
    <ButtonWithAuth
      className="w-[86px] h-[26px] text-[12px] border border-[#2F3843] !bg-[#1A1E24] !text-[#ADBCCF] ml-[6px]"
      isPrimary={false}
      onClick={() => {}}
    >
      Cancel
    </ButtonWithAuth>
  );
}
