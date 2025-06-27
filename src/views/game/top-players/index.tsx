import { useRef, useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-coverflow";
import type SwiperType from "swiper";
import Player from "./player";
import TriIcon from "./tri-icon";
import useData from "../hooks/use-data";

let LEN = 10;

export default function TopPlayers() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [speed, setSpeed] = useState(1600);
  const { preopen, open, currentGame } = useData();

  const buyers = useMemo(() => {
    if (!currentGame) return Array.from({ length: LEN }, (_) => ({}));
    if (currentGame.buyers.length < LEN) {
      return [
        ...Array.from({ length: 2 }, (_) => ({})),
        ...currentGame.buyers,
        ...Array.from(
          { length: LEN - currentGame.buyers.length - 2 },
          (_) => ({})
        )
      ];
    } else {
      LEN = currentGame.buyers.length;
      return currentGame.buyers;
    }
  }, [currentGame]);

  useEffect(() => {
    setSpeed(preopen ? 100 : 1600);
  }, [preopen]);

  useEffect(() => {
    if (!swiperRef.current) return;
    const idx = buyers.findIndex(
      (item: any) => item.user_id === currentGame.winner_info?.winner_id
    );

    if (open && idx !== -1) {
      swiperRef.current?.autoplay.stop();
      swiperRef.current?.slideToLoop(idx, 300, true);
    } else if (currentGame.status === "active") {
      swiperRef.current?.autoplay.start();
    }
  }, [open, currentGame]);

  return (
    <div className="w-full px-[40px] relative h-[220px] mt-[30px] mx-[auto]">
      <div className="w-full h-full pointer-events-none absolute top-0 left-0 bg-gradient-to-r from-[#000] via-transparent to-[#000] z-10" />
      <Swiper
        effect="coverflow"
        centeredSlides={true}
        slidesPerView="auto"
        breakpoints={{
          320: { slidesPerView: 3 },
          1360: { slidesPerView: 5 },
          1560: { slidesPerView: 6 }
        }}
        spaceBetween={16}
        loop={true}
        speed={speed}
        initialSlide={2}
        modules={[EffectCoverflow, Autoplay]}
        coverflowEffect={{
          rotate: -8,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: true
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onRealIndexChange={(swiper) => {
          setActiveIndex(swiper.realIndex % LEN);
        }}
        className="w-full h-full relative"
      >
        {buyers.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Player key={index} active={index === activeIndex} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <TriIcon className="absolute left-[50%] translate-x-[-50%] top-[-10px] z-20" />
      <TriIcon className="absolute left-[50%] translate-x-[-50%] bottom-[26px] rotate-180 z-20" />
    </div>
  );
}
