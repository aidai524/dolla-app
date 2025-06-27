import PageBack from "@/components/page-back";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/icons/loading";
import useDrawInfo from "../hooks/use-draw-info";
import Players from "./players";
import Top from "./top";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { drawInfo, drawInfoLoading, players, playersLoading, fetchDrawInfo } =
    useDrawInfo(id);

  return (
    <div className="px-[40px] relative pt-[20px] w-full">
      <PageBack
        onClick={() => {
          navigate("/");
        }}
        className="border border-[#373737] rounded-[10px] px-[15px] py-[6px] absolute top-[10px] left-0"
      />
      {drawInfoLoading ? (
        <div className="flex justify-center items-center h-[512px]">
          <Loading size={40} />
        </div>
      ) : (
        drawInfo && (
          <div className="pl-[40px] max-w-[1000px] mx-auto">
            <Top
              drawInfo={drawInfo}
              onSuccess={() => {
                fetchDrawInfo(true);
              }}
            />
            <Players
              players={players}
              data={drawInfo}
              loading={playersLoading}
            />
          </div>
        )
      )}
    </div>
  );
}
