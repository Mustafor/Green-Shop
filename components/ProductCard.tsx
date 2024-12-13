"use client"
import React, { useContext, useState } from 'react'
import { BasketIcon, LikeIcon, SearchIcon } from '@/public/icon/Icon'
import { ProductsType } from '@/service/getProducts'
import Image from 'next/image'
import { Context } from '@/context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { instance } from '@/hook/instance'

const ProductCard: React.FC<{ item: ProductsType }> = ({ item }) => {
  const { token } = useContext(Context)
  const querClinet = useQueryClient()
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isInBasket, setIsInBasket] = useState(false)

  const likeMutation = useMutation({
    mutationFn: (id: string) =>
      instance().post(`/like/${id}`, {}, {
        headers: { "Authorization": `Bearer ${token}` }
      }),
    onSuccess: () => querClinet.invalidateQueries({ queryKey: ['products'] })
  })

  function handleLikeBtnClick(id:string){
    if (!token) {
      alert("Logindan otishingiz zarur")
    } 
    else{
      likeMutation.mutate(id)
    }
  }

  const basketMutation = useMutation({
    mutationFn: (data: { productId: string }) =>
      instance().post(`/basket`, data, {
        headers: { "Authorization": `Bearer ${token}` }
      }),
    onSuccess: () => {
      querClinet.invalidateQueries({ queryKey: ['products'] })
      querClinet.invalidateQueries({ queryKey: ['basket_list'] })
    }
  })

  function handleBasketBtnClick(productId: string) {
    if (!token){
      alert("Logindan otishingiz zarur")
    } 
    else{
      const data = { productId }
      basketMutation.mutate(data)
    }
  }

  return (
    <div
      className="w-[250px] h-[350px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-[4px] py-[31px] bg-white">
        <Image style={{ width: '250px', height: '250px' }} className="bg-#FBFBFB w-[250px] h-[250px]" src={item.image_url ? item.image_url[0] : '/images/img 1.png'} alt="flower" width={250} height={250}/>
        <div className="flex items-center justify-center gap-[10px]">
          <button onClick={() => handleBasketBtnClick(item.product_id)} className={`w-[35px] cursor-pointer flex items-center justify-center rounded-md h-[35px] transition-all duration-300 ${item.basket ? 'bg-green-500 text-white' : 'bg-[#FBFBFB]'}`} aria-label="Add to basket">
            <BasketIcon />
          </button>
          <button onClick={() => handleLikeBtnClick(item.product_id)} className={`w-[35px] cursor-pointer flex items-center justify-center rounded-md h-[35px] transition-all duration-300 ${item.like ? 'bg-red-500' : 'bg-[#FBFBFB]'}`} aria-label="Like product">
            <LikeIcon />
          </button>
          <button className="w-[35px] cursor-pointer flex items-center justify-center rounded-md h-[35px] bg-[#FBFBFB]" aria-label="Search product">
            <SearchIcon />
          </button>
        </div>
      </div>
      <h2 className="text-[16px] text-[#3D3D3D] mb-[6px]">{item.product_name}</h2>
      <div className="flex items-center space-x-2">
        <del className="text-[18px] font-bold text-red-500">{item.cost}$</del>
        {item.discount && <strong className="text-[18px] font-bold text-[#46A358]">{item.discount}$</strong>}
      </div>
    </div>
  )
}

export default ProductCard;
