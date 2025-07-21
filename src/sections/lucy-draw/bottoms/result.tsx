import StarBg from "../star-bg";

export default function ResultBottom() {
  return (
    <>
      <div className="flex absolute z-[1]">
        <StarBg />
        <StarBg className="ml-[-50px]" />
        <StarBg className="ml-[-50px]" />
      </div>
      <div className="relative z-[2] w-full h-full flex items-center justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <img
            key={item}
            className="w-[30px] h-[30px] rounded-full border border-[#DD9000] ml-[-10px]"
          />
        ))}
      </div>
    </>
  );
}
