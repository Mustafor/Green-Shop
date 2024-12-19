"use client"
import Image from 'next/image'
import React from 'react'
import Button from './Button'

const Hero = () => {
  return (
    <section className="px-[120px]">
    <div className="flex justify-between px-[40px] bg-[#F5F5F580]">
      <div className="w-[557px] mt-[68px]">
        <strong className="font-medium text-[18px] text-[#3D3D3D] mb-[7px]">Welcome to GreenShop</strong>
        <h2 className="font-extrabold mb-[5px] leading-[70px] text-[#3D3D3D] text-[70px]">
          Let’s Make A
          Better <span className="text-[#46A358]">PLANET</span>
        </h2>
        <p className="text-[14px] font-medium tetx-[#3D3D3D] mb-[44px]">We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!</p>
        <Button title="SHOP NOW" extraStyle="!w-[140px]" type="submit" />
      </div>
      <Image style={{ width: "auto", height: "auto" }} priority src={"/images/img 1.png"} alt="Img" width={518} height={518} />
    </div>
  </section>
  )
}

export default Hero