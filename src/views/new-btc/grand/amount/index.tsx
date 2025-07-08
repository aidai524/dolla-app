import Bg from "./bg";
import "./index.css";

export default function Amount() {
  return (
    <div className="w-[27%] h-full absolute left-[50%] translate-x-[-50%] top-[-4%]">
      <Bg />
      <div className="btc-amount">0.1 BTC</div>
    </div>
  );
}
