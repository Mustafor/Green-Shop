"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Hero from "../Hero";
import "swiper/css";
import "./index.css";

export default function Carusel() {
  return (
    <>
      <Swiper className="mySwipper">
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
