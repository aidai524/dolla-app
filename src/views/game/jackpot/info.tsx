import LinkIcon from "./link-icon";
import DetailPanel from "./detail-panel";
import Popover, {
  PopoverPlacement,
  PopoverTrigger
} from "@/components/popover";

export default function Info({ game }: any) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="text-white text-[18px] font-medium leading-[100%]">
        {game?.asset?.token_id} {game?.asset?.name}
      </div>
      <div className="flex gap-[5px]">
        <Popover
          trigger={PopoverTrigger.Hover}
          placement={PopoverPlacement.BottomRight}
          content={<DetailPanel game={game} />}
          contentStyle={{
            zIndex: 50
          }}
        >
          <button className="button bg-[#191817CC] text-[#8C8B8B] px-[10px] py-[6px] rounded-full text-[10px]">
            Details
          </button>
        </Popover>

        <a
          href={
            !game?.asset?.contract_address
              ? `https://magiceden.io/collections/berachain/${game.asset.contract_address}`
              : ""
          }
          target="_blank"
          className="button bg-[#191817CC] text-[#8C8B8B] px-[10px] py-[6px] rounded-full text-[10px] flex items-center gap-[5px]"
        >
          <span>{game?.asset?.name}</span>
          <LinkIcon />
        </a>
        <div className="bg-[#191817CC] text-[#8C8B8B] px-[10px] py-[6px] rounded-full text-[10px]">
          Round <span className="text-[#EBFF57]">#{game?.round}</span>
        </div>
      </div>
    </div>
  );
}
