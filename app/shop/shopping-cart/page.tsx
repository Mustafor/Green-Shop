"use client"
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import ProductCard from '@/components/ProductCard'
import { Context } from '@/context/AuthContext'
import debounce from '@/hook/useDebounce'
import { instance } from '@/hook/useInstance'
import {  DeleteIcon, ModalIcon } from '@/public/icon/Icon'
import { ProductsType, getProducts } from '@/service/getProducts'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

const shoppingCard = () => {
  const [size, setSize] = useState<string | null>(null)
  const [price, setPrice] = useState<number[] | number>([39, 1230])
  const [categoryName, setCategoryName] = useState<string | null>(null)
  const [tags, setTags] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState(10)
  const fullPrice = debounce(price, 1000)
  const {token, setCount} = useContext(Context)
  const [isOpenModal, setLoginModal] = useState<boolean>(false)
  
  
  const products: ProductsType[] = getProducts(categoryName, tags, page, setTotalPage, fullPrice, size)
  
  const { data = [] } = useQuery({
    queryKey: ['basket_list'],
    queryFn:() => token ? instance().get(`/basket`, {
      headers: {"Authorization":`Bearer ${token}`},
      params: { page: 1, limit: 1000 }
    }).then(res => res.data.ProductId) : []
  })

  const [basketProducts, setBasketProducts] = useState<ProductsType[]>(data.map((item: ProductsType) => {
    item.count = 1
    item.totalPrice = item.count * item.cost
    return item
  }))

  useEffect(() => {
    if (data.length > 0) {
      setBasketProducts(data)
    }
  }, [data])

  const handleIncreaseCount = (productId:string) => {
    setBasketProducts(prevProducts =>
      prevProducts.map(item =>
        item.product_id == productId ? { ...item, count: item.count + 1, totalPrice: (item.count + 1) * item.cost } : item
      )
    )
  }

  const handleDecreaseCount = (productId:string) => {
    setBasketProducts(prevProducts =>
      prevProducts.map(item =>
        item.product_id == productId && item.count > 1 ? { ...item, count: item.count - 1, totalPrice: (item.count - 1) * item.cost} :item
      )
    )
  }

  const totalPrice = basketProducts.reduce((sum, item) => {
    const price = item.totalPrice ? (typeof item.totalPrice === 'number' ? item.totalPrice : parseFloat(item.totalPrice as string)) : 0
    return sum + price
  }, 0)

  const handleRemoveFromBasket = (productId: string) => {
    const updatedBasket = basketProducts.filter(item => item.product_id != productId)
    setBasketProducts(updatedBasket)
  }

  return (
    <>
        <div className="px-[120px]">
        <div className='w-[500px] flex gap-[30px]'>
            <div>
        <table className='mb-[85px] mt-[50px]'>
          <thead className='border-b-[1px] border-[#FBFBFB]'>
            <tr className='flex items-center w-full'>
              <th className='text-[#3D3D3D] text-[15px] font-medium w-[40%] text-start'>Products</th>
              <th className='text-[#3D3D3D] text-[15px] font-medium w-[20%] text-start'>Price</th>
              <th className='text-[#3D3D3D] text-[15px] font-medium w-[20%] text-start'>Quality</th>
              <th className='text-[#3D3D3D] text-[15px] font-medium w-[20%] text-start'>Total</th>
            </tr>
            <span className='border-b-[2px] border-b-[#46A358] block w-[782px] mt-[11px]'></span>
          </thead>
          <tbody >
            {basketProducts.map((item: ProductsType) => (
              <tr key={item.product_id} className="flex items-center bg-[#FBFBFB] mt-[11px]">
                <td className="text-center flex items-center w-[40%] px-5">
                  <Image src={item.image_url[0]} alt="product-img" priority style={{ width: "70px", height: "70px" }} width={70} height={70} />
                  <div className='flex flex-col ml-[14px]'>
                    <span className='text-[#3D3D3D] text-start text-[16px] font-medium'>{item.product_name}</span>
                    <span className='line-clamp-1 text-start text-[#A5A5A5]'>SKU: <span className='text-[#727272] font-normal text-[14px]'>{item.product_id}</span> </span>
                  </div>
                </td>
                <td className='text-[#727272] font-medium ml-[2px] text-[16px]'>${item.cost}.00</td>
                <td className='mr-[75px]'>
                  <div className='flex items-center ml-[75px] gap-[13px]'>
                  <button onClick={() => handleDecreaseCount(item.product_id)} className='w-[33px] h-[33px] bg-[#46A358] rounded-full text-[18px] text-white font-bold'>-</button>
                    <span>{item.count}</span>
                  <button onClick={() => handleIncreaseCount(item.product_id)} className='w-[33px] h-[33px] bg-[#46A358] rounded-full text-[18px] text-white font-bold'>+</button>
                  </div>
                </td>
                <td className='flex items-center justify-between text-[#46A358] text-[16px] font-bold mr-[60px]'>${item.totalPrice}.00</td>
                <td className='flex items-center justify-end'>
                    <button onClick={() => handleRemoveFromBasket(item.product_id)} className='hover:scale-[1.2] duration-300'>
                        <DeleteIcon/>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='py-[51px]'>
        <h2 className='text-[#3D3D3D] tetx-[18px] font-bold'>Cart Totals</h2>
        <span className='border-b-[2px] border-b-[#46A35880] w-[328px] block mt-[11px]'></span>
        <span className='text-[14px] text-[#3D3D3D] block py-[10px]'>Coupon Apply</span>
        <label className="flex mb-[17px] border-[2px] border-[#46A358] items-center mt-[18px] justify-between relative rounded-md">
            <input className="w-[322px] focus:shadow-2xl outline-none px-[11px] py-[12px] pr-[110px] rounded-md" placeholder="Enter coupon code here..." type="text"/>
            <button className="bg-[#46A358] text-white rounded-r-md hover:bg-transparent duration-300 hover:text-[#46A358] absolute right-0 top-0 w-[100px] py-[13px]">Apply</button>
        </label>
        <div className='flex items-center justify-between'>
            <strong className='text-[16px] font-bold text-[#3D3D3D]'>Total</strong>
            <strong className='text-[18px] text-[#46A358] font-bold'>${totalPrice}.00</strong>
        </div>
        <div className='py-[12px]'>
        <button onClick={() => setLoginModal(true)} className='w-[332px] border-[2px] border-[#46A358] duration-300 hover:bg-transparent hover:text-[#46A358] py-[12px] bg-[#46A358] text-white font-bold text-[15px] rounded-md'>Proceed To Checkout</button>
        </div>
        <span className='text-center text-[15px] flex items-center justify-center duration-300 hover:text-black text-[#46A358]'>Continue Shopping</span>
    </div>
        </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-[#46A358] text-[17px]">Releted Products</h1>
        <del className="mt-[12px] mb-[44px] h-[1px] text-[#46A35880] w-[1200px]"></del>
      </div>
      <div className="flex flex-wrap gap-4 mb-[120px] w-full">
        {products ? (products.map((item: ProductsType) => (<ProductCard item={item} key={item.product_id} />))) : (<h1 className="text-[50px] text-[#46A358] text-center mt-[150px] ml-[250px] font-bold">No Flowers</h1>)}
      </div>
    </div>
    <Footer/>
      <Modal width={590} isOpen={isOpenModal} setIsOpen={setLoginModal}>
            <div className='flex flex-col w-full h-full items-center bg-[#46A3580F] mb-[15px]'>
              <div className='mt-[29px]'>
              <ModalIcon/>
              </div>
              <span className='text-[#727272] font-normal text-[16px] py-[15px]'>Your order has been received</span>
            </div>
            <ul className='flex items-center justify-between mx-[40px] pb-[15px] border-b-[1px] border-[#46A35833] mb-[18px]'>
              <li className='flex flex-col items-center border-r-[1px] border-[#46A35833] pr-[22px]'>
                <span className='text-[#727272] text-[14px] font-normal mb-1'>Order Number</span>
                <span className='text-[#727272] text-[15px] font-bold'>19586687</span>
              </li>
              <li className='flex flex-col items-center border-r-[1px] border-[#46A35833] pr-[22px]'>
                <span className='text-[#727272] text-[14px] font-normal mb-1'>Date</span>
                <span className='text-[#727272] text-[15px] font-bold'>15 Sep, 2021</span>
              </li>
              <li className='flex flex-col items-center border-r-[1px] border-[#46A35833] pr-[22px]'>
                <span className='text-[#727272] text-[14px] font-normal mb-1'>Total</span>
                <span className='text-[#727272] text-[15px] font-bold'>2,699.00</span>
              </li>
              <li className='flex flex-col items-center'>
                <span className='text-[#727272] text-[14px] font-normal mb-1'>Payment Method</span>
                <span className='text-[#727272] text-[15px] font-bold'>Cash on delivery</span>
              </li>
            </ul>
            <table className='mb-[20px] px-[40px] w-[495px] items-center'>
              <thead className='border-b-[2px] border-[#FBFBFB] w-full px-[40px]'>
                <tr className='flex items-center justify-between w-full'>
                  <th className='w-[300px] font-medium text-[16px] text-[#3d3d3d] text-center'>Products</th>
                  <th className='w-[95px] font-medium text-[16px] text-[#3d3d3d]'>Qty</th>
                  <th className='w-[95px] font-medium text-[16px] text-[#3d3d3d]'>Subtotal</th>
                </tr>
              </thead>
              <tbody className='mx-[40px] '>
                {basketProducts.map((item: ProductsType) => (
                  <tr key={item.product_id} className="flex items-center justify-center mt-[11px] w-full bg-[#FBFBFB]">
                    <td className="text-center flex items-center w-[300px]">
                      <Image src={item.image_url[0]} alt="product-img" priority style={{ width: "70px", height: "70px" }} width={70} height={70} />
                      <div className='flex flex-col'>
                        <span className='text-[#3D3D3D] ml-[11px] text-start text-[16px] font-medium'>{item.product_name}</span>
                        <span className='text-[#A5A5A5] text-start ml-[11px] line-clamp-1'>SKU: <span className='text-[#727272] font-normal text-[14px]'>{item.product_id}</span> </span>
                      </div>
                    </td>
                    <td className='text-[#727272] font-medium text-[16px] w-[95px] text-center'>{item.count}</td>
                    <td className='font-bold text-[16px] text-[#46A358] w-[95px] text-center'>${item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex items-center flex-col w-[495px]'>
              <span className='text-[#3D3D3D] font-normal text-[15px] flex pl-[250px]'>Shiping<span className='font-medium text-[18px] text-[#3D3D3D] flex ml-[215px] mr-[40px]'>${basketProducts.map((item: ProductsType) => item.count)}</span></span>
            </div>
            <div className='flex items-center flex-col w-[495px] border-b-[1px] border-[#46A35880] pb-[20px] mb-[20px]'>
            <span className='text-[#3D3D3D] font-bold text-[16px] flex pl-[250px]'>Total<span className='font-medium text-[18px] text-[#3D3D3D] flex ml-[195px] mr-[40px]'>${basketProducts.map((item: ProductsType) => item.totalPrice)}</span></span>
            </div>
            <p className='w-[483px] flex items-center justify-center text-[#727272] font-normal text-[14px] px-[40px] mb-[50px]'>{basketProducts.map((item: ProductsType) => item.short_description)}</p>
            <Button onClick={() => setLoginModal(false)} title='Track your order' type='button' extraStyle='w-[162px] rounded-md bg-[#46A358] text-white font-bold text-[16px] mx-auto border-[1px] duration-300 hover:text-[#46A358] hover:border-[#46A358] hover:bg-[white] mb-[14px]' />
          </Modal>
    </>
  )
}

export default shoppingCard