import React, { useState, useContext } from 'react';
import { Context } from '@/context/AuthContext';
import { BasketIcon, LikeIcon, SearchIcon } from '@/public/icon/Icon';
import { ProductsType } from '@/service/getProducts';
import Image from 'next/image';

const ProductCard: React.FC<{ item: ProductsType }> = ({ item }) => {
  const { cart, setCart } = useContext(Context)
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isInBasket, setIsInBasket] = useState(false)

  const handleLikeClick = () => {
    setIsLiked(!isLiked)
  }

  const handleBasketClick = () => {
    if (isInBasket) {
      setCart(cart.filter((itemInCart) => itemInCart.product_id != item.product_id))
    } 
    else {
      setCart([...cart, item])
    }
    setIsInBasket(!isInBasket)
  }

  return (
    <div
      className="w-[300px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-[4px] py-[31px] bg-white">
        <Image style={{ width: 'auto', height: 'auto' }} className="bg-#FBFBFB" src={item.image_url ? item.image_url[0] : '/images/img 1.png'} alt="flower" width={2500} height={250}/>
        {isHovered && (
          <div className="flex items-center justify-center gap-[10px]">
            <div
              className={`w-[35px] cursor-pointer flex items-center justify-center rounded-md h-[35px] transition-all duration-300 ${isInBasket ? 'bg-green-500' : 'bg-[#FBFBFB]'}`}
              onClick={handleBasketClick} 
            >
              <BasketIcon />
            </div>
            <div
              className={`w-[35px] cursor-pointer flex items-center justify-center rounded-md h-[35px] transition-all duration-300 ${isLiked ? 'bg-red-500' : 'bg-[#FBFBFB]'}`}
              onClick={handleLikeClick} 
            >
              <LikeIcon />
            </div>
            <div className="w-[35px] cursor-pointer flex items-center justify-center rounded-md h-[35px] bg-[#FBFBFB]">
              <SearchIcon />
            </div>
          </div>
        )}
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
