import Modal from "@/components/modal";
import Avatar from "@/components/avatar";
import PrizeIcon from "./icon";
import Confetti from "@/components/confetti";

export default function PrizeModal({
  data,
  open,
  onClose
}: {
  data: any;
  open: boolean;
  onClose: () => void;
}) {
  return (
    open && (
      <>
        <Modal open={open} onClose={onClose}>
          <div
            className="w-[340px] h-[349px] rounded-[20px] border-[1px] border-[#434343CC] relative flex flex-col items-center justify-center items-center"
            style={{
              background:
                "radial-gradient(91.56% 96.47% at 98.38% 100%, rgba(235, 255, 87, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(67% 68.56% at 14.26% 1.58%, rgba(161, 150, 255, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), #191817"
            }}
          >
            <PrizeIcon className="absolute top-[-50px] left-[-23px]" />
            <Avatar size={100} className="mt-[30px]" />
            <div className="text-white text-[26px] font-semibold mt-[20px]">
              Congrats!
            </div>
            <div className="text-white text-[14px] font-light mt-[10px]">
              You won {data.asset.name}
            </div>
            <div className="flex items-center justify-center gap-[10px] text-[14px] font-semibold mt-[20px]">
              <button
                className="button w-[143px] h-[40px] rounded-[20px] bg-[#434343] text-white button"
                onClick={onClose}
              >
                Close
              </button>
              {/* <button className="button w-[143px] h-[40px] rounded-[20px] bg-[#EBFF57] text-black">
                Check
              </button> */}
            </div>
          </div>
        </Modal>
        <Confetti />
      </>
    )
  );
}
