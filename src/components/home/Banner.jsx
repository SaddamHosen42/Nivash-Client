import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider1 from "./Slider/Slider1";
import Slider2 from "./Slider/Slider2";
import Slider3 from "./Slider/Slider3";

const Banner = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      //navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      className="w-full"
    >
      <SwiperSlide>
        <Slider1/>
      </SwiperSlide>
      <SwiperSlide>
        <Slider2/>
      </SwiperSlide>
      <SwiperSlide>
        <Slider3/>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
