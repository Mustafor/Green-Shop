"use client"
import { Carusel } from '@/public/icon/Icon'
import Image from 'next/image'
import React from 'react'

const ReletedProducts = () => {
  return (
    <div className='px-[120px]'>
      <div>
        <h2 className='text-[17px] text-[#46A358] mb-[12px] font-bold'>Releted Products</h2>
        <span className='border-b-[1px] block w-[1140px] border-b-[#46A35880]'></span>
        <ul className='mt-[44px] flex items-center gap-[26px]'>
          <li className='w-[219px] hover:shadow-2xl duration-300'>
            <div className='w-full px-[11px] bg-[#FBFBFB]'>
              <Image style={{width:"213px", height:"213px"}} src={"/images/gul1.png"} priority alt='frame' width={213} height={213}/>
            </div>
            <strong className='mt-[12px] text-[15px] flex text-[#3D3D3D]'>Beach Spider Lily</strong>
            <strong className='text-[16px] font-bold text-[#46A358] mt-[5px]'>$129.00</strong>
          </li>
          <li className='w-[219px] hover:shadow-2xl duration-300'>
            <div className='w-full px-[11px] bg-[#FBFBFB]'>
              <Image style={{width:"213px", height:"213px"}} src={"/images/gul2.png"} priority alt='frame' width={213} height={213}/>
            </div>
            <strong className='mt-[12px] text-[15px] flex text-[#3D3D3D]'>Blushing Bromeliad</strong>
            <strong className='text-[16px] font-bold text-[#46A358] mt-[5px]'>$139.00</strong>
          </li>
          <li className='w-[219px] hover:shadow-2xl duration-300'>
            <div className='w-full px-[11px] bg-[#FBFBFB]'>
              <Image style={{width:"213px", height:"213px"}} src={"/images/gul3.png"} priority alt='frame' width={213} height={213}/>
            </div>
            <strong className='mt-[12px] text-[15px] flex text-[#3D3D3D]'>Aluminum Plant</strong>
            <strong className='text-[16px] font-bold text-[#46A358] mt-[5px]'>$179.00</strong>
          </li>
          <li className='w-[219px] hover:shadow-2xl duration-300'>
            <div className='w-full px-[11px] bg-[#FBFBFB]'>
              <Image style={{width:"213px", height:"213px"}} src={"/images/gul4.png"} priority alt='frame' width={213} height={213}/>
            </div>
            <strong className='mt-[12px] text-[15px] flex text-[#3D3D3D]'>Bird's Nest Fern</strong>
            <strong className='text-[16px] font-bold text-[#46A358] mt-[5px]'>$99.00</strong>
          </li>
          <li className='w-[219px] hover:shadow-2xl duration-300'>
            <div className='w-full px-[11px] bg-[#FBFBFB]'>
              <Image style={{width:"213px", height:"213px"}} src={"/images/gul5.png"} priority alt='frame' width={213} height={213}/>
            </div>
            <strong className='mt-[12px] text-[15px] flex text-[#3D3D3D]'>Chinese Evergreen</strong>
            <strong className='text-[16px] font-bold text-[#46A358] mt-[5px]'>$39.00</strong>
          </li>
        </ul>
        <a className='flex items-center justify-center mt-[61px]' href="#">
          <Carusel/>
        </a>
      </div>
    </div>
  )
}

export default ReletedProducts