import React, { useEffect, useState } from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import MovieCard from './MovieCard';
import { toast } from 'react-toastify';
import { MovieCardType } from '@/types/types';




const MoviesSlider = () => {
    
  

    const Movies:MovieCardType[] = [
        {
            title: "Jawan",
            imageUrl: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-OC41LzEwICA0MjMuMUsgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00330424-jpbcmkezwq-portrait.jpg",
            _id: "1",
            rating: 8.5,
            type : "Action/Thriller"
        },
        {
            title: "Jawan",
            imageUrl: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-OC41LzEwICA0MjMuMUsgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00330424-jpbcmkezwq-portrait.jpg",
            _id: "2",
            rating: 8.5,
            type : "Action/Thriller"
        },
        {
            title: "Jawan",
            imageUrl: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-OC41LzEwICA0MjMuMUsgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00330424-jpbcmkezwq-portrait.jpg",
            _id: "3",
            rating: 8.5,
            type : "Action/Thriller"
        },
        {
            title: "Jawan",
            imageUrl: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-OC41LzEwICA0MjMuMUsgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00330424-jpbcmkezwq-portrait.jpg",
            _id: "4",
            rating: 8.5,
            type : "Action/Thriller"
        },
        {
            title: "Jawan",
            imageUrl: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-OC41LzEwICA0MjMuMUsgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00330424-jpbcmkezwq-portrait.jpg",
            _id: "5",
            rating: 8.5,
            type : "Action/Thriller"
        },
        {
            title: "Jawan",
            imageUrl: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-OC41LzEwICA0MjMuMUsgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00330424-jpbcmkezwq-portrait.jpg",
            _id: "6",
            rating: 8.5,
            type : "Action/Thriller"
        }
    ];
    return (
        <div className='sliderout'>
            {/* <h1>Latest Movies</h1> */}
            <Swiper
                slidesPerView={1}
                spaceBetween={1}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 2,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 2,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 2,
                    },
                    '@1.50': {
                        slidesPerView: 6,
                        spaceBetween: 2,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    Movies.map((Movie) => {
                        return (
                            <SwiperSlide>
                                <MovieCard {...Movie} />
                            </SwiperSlide>
                        );
                    })
                }

            </Swiper>
        </div>
    )
}

export default MoviesSlider