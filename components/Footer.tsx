"use client"
import { CardsIcon, FaceebookIcon, InstagramIcon, LinkedinIcon, LocationIcon, LogoIcon, MessageIcon, PhoneIcon, TwitterIcon, UnionIcon } from '@/public/icon/Icon'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="px-[120px] mt-[100px]">
    <div className="bg-[#FBFBFB] flex gap-[2px]">
      <ul className="flex items-center px-[25px] py-[25px] gap-[30px]">
        <li className="w-[204px] border-r-[2px] border-r-[#46A3581A]">
          <div>
          <Image style={{width:"auto", height:"auto"}} src={"/images/frame.png"} alt="photo" width={61} height={46}/>
          <Image style={{width:"auto", height:"auto"}} src={"/images/frame1.png"} alt="photo" width={55} height={48}/>
          </div>
        <div>
            <strong className="text-[17px] font-bold text-[#3D3D3D]">Garden Care</strong>
            <p className="text-[14px] text-[#727272]">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
        </li>
        <li className="w-[204px] border-r-[2px] border-r-[#46A3581A]">
          <Image style={{width:"auto", height:"auto"}} src={"/images/frame2.png"} alt="photo" width={55} height={48}/>
          <div>
            <strong className="text-[17px] mt-[17px] font-bold text-[#3D3D3D] mb-[9px]">Garden Care</strong>
            <p className="text-[14px] text-[#727272]">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
        </li>
        <li className="w-[204px]">
          <Image style={{width:"auto", height:"auto"}} src={"/images/frame3.png"} alt="photo" width={55} height={48}/>
          <div>
            <strong className="text-[17px] mt-[17px] font-bold text-[#3D3D3D] mb-[9px]">Garden Care</strong>
            <p className="text-[14px] text-[#727272]">We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
        </li>
      </ul>
      <div className="py-[37px] px-[25px]">
        <strong className="text-[18px] font-bold tetx-[#3D3D3D]">Would you like to join newsletters?</strong>
        <label className="flex mb-[17px] items-center mt-[18px] justify-between relative">
          <input className="w-[354px] focus:shadow-2xl outline-none px-[11px] rounded-lg py-[12px] pr-[110px]" placeholder="enter your email address..." type="text"/>
          <button className="bg-[#46A358] text-white rounded-r-lg absolute right-0 top-0 w-[85px] py-[12px]">Join</button>
        </label>
        <p className="text-[14px] text-[#727272]">We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours! </p>
      </div>
    </div>
    <div className="px-[23px] flex items-center gap-[75px] py-[26px] bg-[#46A3581A]">
      <a href="/">
      <LogoIcon/>
      </a>
        <div className="w-[176px] flex items-center gap-[9px]">
          <LocationIcon/>
          <a href='#' className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300">70 West Buckingham Ave.
          Farmingdale, NY</a>
        </div>
        <div className="flex items-center gap-[10px]">
          <MessageIcon/>
          <a href='#' className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300">contact@greenshop.com</a>
        </div>
        <div className="flex items-center gap-[8px]">
          <PhoneIcon/>
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="tel:8801911717490">+88 01911 717 490</a>
        </div>
    </div>
    <div className="bg-[#FBFBFB] px-[23px] py-[32px] flex gap-[173px]">
      <ul className="flex flex-col">
        <strong className="text-[18px] font-bold mb-[8px]">My Account</strong>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">My Account</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Our stores</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Contact us</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Career</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Specials</a>
        </li>
      </ul>
      <ul className="flex flex-col">
        <strong className="text-[18px] font-bold mb-[8px]">Help & Guide</strong>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Help Center</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">How to Buy</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Shipping & Delivery</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Product Policy</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">How to Return</a>
        </li>
      </ul>
      <ul className="flex flex-col">
        <strong className="text-[18px] font-bold mb-[8px]">Categories</strong>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">House Plants</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Potter Plants</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Seeds</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Small Plants</a>
        </li>
        <li className="mb-[8px]">
          <a className="text-[14px] text-[#3D3D3D] hover:text-[#46A358] duration-300" href="#">Accessories</a>
        </li>
      </ul>
      <div>
        <strong className="text-[18px] font-bold text-[#3D3D3D]">Social Media</strong>
        <div className="flex items-center mt-[20px] gap-[10px]">
          <a href="#" className="w-[30px] hover:scale-[0.9] duration-300 h-[30px] flex items-center justify-center rounded-md border-[2px] border-[#46A35833]">
            <FaceebookIcon/>
          </a>
          <a href="#" className="w-[30px] hover:scale-[0.9] duration-300 h-[30px] flex items-center justify-center rounded-md border-[2px] border-[#46A35833]">
            <InstagramIcon/>
          </a>
          <a href="#" className="w-[30px] hover:scale-[0.9] duration-300 h-[30px] flex items-center justify-center rounded-md border-[2px] border-[#46A35833]">
            <TwitterIcon/>
          </a>
          <a href="#" className="w-[30px] hover:scale-[0.9] duration-300 h-[30px] flex items-center justify-center rounded-md border-[2px] border-[#46A35833]">
            <LinkedinIcon/>
          </a>
          <a href="#" className="w-[30px] hover:scale-[0.9] duration-300 h-[30px] flex items-center justify-center rounded-md border-[2px] border-[#46A35833]">
            <UnionIcon/>
          </a>
        </div>
        <div className="py-[33px]">
        <strong className="text-[18px] block py-[13px] font-bold text-[#3D3D3D]">We accept</strong>
          <a href="#">
          <CardsIcon/>
          </a>
          </div>
      </div>
    </div>
      <span className="border-t-[1px] w-[1140px] border-t-[#46A35833] inline-block"></span>
    <strong className="text-[14px] flex items-center justify-center font-medium text-[#3D3D3D]">© 2021 GreenShop. All Rights Reserved.</strong>
  </footer>
  )
}

export default Footer