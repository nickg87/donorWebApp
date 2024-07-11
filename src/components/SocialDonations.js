"use client";

// src/components/SocialDonations.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LazyLoad from 'react-lazyload';


const SocialDonations = () => {

  const usePlaceholder = true;
  const items = [
    { id: 1, image: '/donor-image-1.jpg', text: 'Donation Pool 1' },
    { id: 2, image: '/donor-image-2.jpg', text: 'Donation Pool 2' },
    { id: 3, image: '/donor-image-3.jpg', text: 'Donation Pool 3' },
    { id: 4, image: '/donor-image-4.jpg', text: 'Donation Pool 4' },
    { id: 5, image: '/donor-image-5.jpg', text: 'Donation Pool 5' },
    { id: 6, image: '/donor-image-6.jpg', text: 'Donation Pool 6' },
    { id: 7, image: '/donor-image-7.jpg', text: 'Donation Pool 7' },
    { id: 8, image: '/donor-image-8.jpg', text: 'Donation Pool 8' },
  ];

  const itemsPlaceholder = [
    { id: 1, image: '/placeholder.jpg', text: 'Donation Pool 1' },
    { id: 2, image: '/placeholder.jpg', text: 'Donation Pool 2' },
    { id: 3, image: '/placeholder.jpg', text: 'Donation Pool 3' },
    { id: 4, image: '/placeholder.jpg', text: 'Donation Pool 4' },
    { id: 5, image: '/placeholder.jpg', text: 'Donation Pool 5' },
    { id: 6, image: '/placeholder.jpg', text: 'Donation Pool 6' },
    { id: 7, image: '/placeholder.jpg', text: 'Donation Pool 7' },
    { id: 8, image: '/placeholder.jpg', text: 'Donation Pool 8' },
  ];

  const swipeItems = usePlaceholder ? itemsPlaceholder : items;

  return (
    <div className="container mx-auto py-8">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
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
        {swipeItems.map((item) => (
          <SwiperSlide key={item.id}>
            <LazyLoad height={200} once>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <img
                  src={item.image}
                  alt={item.text}
                  title={item.text}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <p className="text-gray-700 text-center">{item.text}</p>
                </div>
              </div>
            </LazyLoad>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SocialDonations;
