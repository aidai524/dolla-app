import Players from "./players";
import Grand from "./grand";

export default function NewBTC() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Grand className="w-[80vw] h-[calc(100vh-148px)] mt-[25px]" />
      <Players className="w-[100vw] h-[148px]" />
    </div>
  );
}
