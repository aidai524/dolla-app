export default function NFTBg({ url }: { url: string }) {
  return (
    <div className="absolute top-0 left-0 w-full h-[353px] overflow-hidden bg-[#1A1E24] opacity-20">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat blur-[25px]"
        style={{
          backgroundImage: `url(${url})`
        }}
      ></div>
    </div>
  );
}
