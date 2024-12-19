"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import "./index.css"
import ReletedProducts from '../ReletedProducts'

export default function CaruselShop() {
  return (
    <>
    <Swiper className="mySwipper">
        <SwiperSlide>
            <ReletedProducts/>
        </SwiperSlide>
        <SwiperSlide>
            <ReletedProducts/>
        </SwiperSlide>
        <SwiperSlide>
            <ReletedProducts/>
        </SwiperSlide>
        <SwiperSlide>
            <ReletedProducts/>
        </SwiperSlide>
    </Swiper>
    </>
  )
}
