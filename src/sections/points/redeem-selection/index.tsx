import Modal from "@/components/modal";
import Avatar from "@/components/avatar";
import { useAuth } from "@/contexts/auth";
import { formatAddress } from "@/utils/format/address";
import { addThousandSeparator } from "@/utils/format/number";
import PointIcon from "@/components/icons/point-icon";
import RedeemSelectionItem from "./item";
import { useConfigStore } from "@/stores/use-config";
import { useMemo, useState } from "react";
import { BASE_TOKEN, QUOTE_TOKEN } from "@/config/btc";
import useUserInfoStore from "@/stores/use-user-info";
import Redeem from "../redeem";
import History from "../history";

export default function RedeemSelection({
  points,
  showRedeemSelection,
  onClose
}: {
  points: number;
  showRedeemSelection: boolean;
  onClose: () => void;
}) {
  const { userInfo } = useAuth();
  const { config } = useConfigStore();
  const { prize } = useUserInfoStore();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [items, itemsMap] = useMemo(() => {
    if (!config?.point_withdrawal_config) return [];
    let _itemsMap: any = {};
    const _items = config.point_withdrawal_config.map((item: any) => {
      let icon = "";
      let name = "";

      if (item.token.toLowerCase() === BASE_TOKEN.address.toLowerCase()) {
        icon = BASE_TOKEN.pointIcon;
        name = BASE_TOKEN.name;
      } else if (
        item.token.toLowerCase() === QUOTE_TOKEN.address.toLowerCase()
      ) {
        icon =
          item.token_volume === "1" ? "/points/bid.png" : QUOTE_TOKEN.pointIcon;
        name = item.token_volume === "1" ? "Free Bid" : QUOTE_TOKEN.name;
      } else if (item.token === "SOL") {
        icon = "/points/solana.png";
        name = "SOL";
      }
      _itemsMap[item.token + "_" + item.token_volume] = { name };
      return {
        ...item,
        icon,
        name,
        disabled: prize.points < Number(item.number)
      };
    });
    return [_items, _itemsMap];
  }, [config?.point_withdrawal_config, prize]);

  const close = () => {
    onClose();
    setSelectedItem(null);
    setShowHistory(false);
  };

  return (
    <>
      <Modal open={showRedeemSelection} onClose={close}>
        <div className="w-[814px] h-[422px] rounded-[16px] border border-[#6A5D3A] bg-[#35302B]">
          <div className="h-[54px] bg-[#00000033] rounded-t-[16px] flex items-center justify-between px-[16px]">
            <div className="text-[20px] text-white">Points Redemption</div>
            <button className="w-[24px] h-[24px] button" onClick={close}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
              >
                <path
                  d="M5 4.57422L8 0.592773H10L6 5.90137L10 11.21H8L5 7.22852L2 11.21H0L4 5.90137L0 0.592773H2L5 4.57422Z"
                  fill="#BBACA6"
                />
              </svg>
            </button>
          </div>
          <div className="p-[20px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[16px]">
                <Avatar size={46} address={userInfo?.sol_user} />
                <div className="font-[DelaGothicOne] text-white flex items-center">
                  <div className="text-[20px]">
                    {userInfo?.name || formatAddress(userInfo?.sol_user)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-[8px]">
                  <PointIcon />
                  <span
                    className="text-[#FFEF43] text-[20px] font-bold font-[AlfaSlabOne]"
                    style={{
                      WebkitTextStrokeWidth: "1px",
                      WebkitTextStrokeColor: "#5E3737"
                    }}
                  >
                    x{addThousandSeparator(points.toString())}
                  </span>
                </div>
                <button
                  className="underline button text-white text-[14px]"
                  onClick={() => setShowHistory(true)}
                >
                  Redeem History
                </button>
              </div>
            </div>
            <div className="flex gap-[16px] mt-[20px]">
              {items.map((item: any, index: number) => (
                <RedeemSelectionItem
                  key={index}
                  data={item}
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                  className="w-1/4"
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
      <Redeem
        data={selectedItem}
        showRedeem={!!selectedItem}
        points={points}
        onClose={() => {
          setSelectedItem(null);
        }}
        onSuccess={() => {
          setSelectedItem(null);
        }}
      />
      <History
        itemsMap={itemsMap}
        showHistory={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </>
  );
}
