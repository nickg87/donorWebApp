import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import LazyLoad from "react-lazyload";
import SliderItem from "@/components/UI/SliderItem";
import React from "react";

const SwiperComponent = ({ items, type }) => {
  return (
    <div className="container mx-auto p-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{clickable: true}}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <LazyLoad height={225} once>
              <SliderItem item={item} type={type}/>
            </LazyLoad>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperComponent;