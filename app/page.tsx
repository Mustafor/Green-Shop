"use client"
import Button from "@/components/Button"
import { CategoryType, getCategories } from "@/service/getCategories"
import { getProducts, ProductsType } from "@/service/getProducts"
import { Pagination } from "@nextui-org/pagination"
import Image from "next/image"
import { useState } from "react"
import ProductCard from "@/components/ProductCard"
import { RightIcon } from "@/public/icon/Icon"
import Footer from "@/components/Footer"

export default function Home() {
  const [categoryName, setCategoryName] = useState<string | null>(null)
  const [tags, setTags] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(10)

  const categories:CategoryType[] = getCategories()
  const products:ProductsType[] = getProducts(categoryName, tags, page, setTotalPage)

  return (
    <>
    <main>
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
          <Image style={{width:"auto", height:"auto"}} priority src={"/images/img 1.png"} alt="Img" width={518} height={518} />
        </div>
      </section>

      <section className="flex px-[120px] gap-[50px] py-[50px] justify-between">
        <ul className="w-[20%] bg-[#FBFBFB]">
        <h2 className="text-[18px]  text-[#3D3D3D] px-[18px] py-[14px]">Categories</h2>
          {[{ category_name: "All", category_id: null }, ...categories].map((item: CategoryType, index) => (
            <>
            <li 
              onClick={() => setCategoryName(item.category_name)}
              className={`cursor-pointer px-[30px] ${categoryName === item.category_name ? "text-[#46A358]" : "text-black"} py-[15px]`}
              key={item.category_id || index}
            >
              {item.category_name}
            </li>
            </>
          ))}
        </ul>

        <div className="w-[80%]">
          <ul className="flex items-center space-x-[37px]">
            <li className={`cursor-pointer text-[18px] font-bold ${tags == null && "text-green-500 hover:text-green-500 border-b-[3px] border-transparent hover:border-b-[3px] duration-300 hover:border-green-500"}`} onClick={() => setTags(null)}>All Plants</li>
            <li className={`cursor-pointer text-[18px] font-bold ${tags == "new-arrivals" && "text-green-500 hover:text-green-500 border-b-[3px] border-transparent hover:border-b-[3px] duration-300 hover:border-green-500"}`} onClick={() => setTags("new-arrivals")}>New Arrivals</li>
            <li className={`cursor-pointer text-[18px] font-bold ${tags == "sale" && "text-green-500 hover:text-green-500 border-b-[3px] border-transparent hover:border-b-[3px] duration-300 hover:border-green-500"}`} onClick={() => setTags("sale")}>Sale</li>
          </ul>

          <div className="flex items-center flex-wrap gap-5">
          {products ? products.map((item:ProductsType) => <ProductCard key={item.product_id} item={item}/>) : "Empty"}
        </div>
        </div>
      </section>
      <div className="flex justify-end p-10">
          <Pagination
            onClick={(e) => setPage(e)}
            size="lg"
            color="success"
            initialPage={page}
            total={totalPage / 6}
          />
        </div>
        <section className="px-[120px] py-[94px]">
          <div className="flex justify-between gap-[28px]">
              <div className="w-[586px] h-[250px] flex justify-between gap-[50px] bg-[#FBFBFB] px-[25px] py-[30px] rounded-md">
                <Image style={{width:"auto", height:"auto"}} src={"/images/flower.png"} alt="photo" width={287} height={287}/>
                <div>
                  <h3 className="font-bold text-[18px] text-black mb-[15px]">SUMMER CACTUS & SUCCELENTS</h3>
                  <p className="text-[16px] text-[#727272] mb-[20px]">We are an online plant shop offering a wide range of cheap and trendy plants</p>
                  <Button title="Find More" type="button"></Button>
                </div>
              </div>
              <div className="w-[586px] h-[250px] flex justify-between gap-[50px] bg-[#FBFBFB] px-[25px] py-[30px] rounded-md">
                <Image style={{width:"auto", height:"auto"}} src={"/images/flower2.png"} alt="photo" width={287} height={287}/>
                <div>
                  <h3 className="font-bold text-[18px] text-black mb-[15px]">STYLING TRENDS & MUCH MORE</h3>
                  <p className="text-[16px] text-[#727272] mb-[20px]">We are an online plant shop offering a wide range of cheap and trendy plants</p>
                  <Button title="Find More" type="button"></Button>
                </div>
              </div>
          </div>
        </section>
        <section className="px-[120px]">
          <div className="text-center">
            <h2 className="text-[30px] text-[#3D3D3D] font-bold mb-[15px]">Our Blog Posts</h2>
            <p className="text-[14px] mb-[35px] text-[#727272]">We are an online plant shop offering a wide range of cheap and trendy plants. </p>
          </div>
          <ul className="flex justify-between gap-[44px]">
            <li className="w-[368px] bg-[#FBFBFB]">
              <Image style={{width:"auto", height:"auto"}} src={"/images/poast1.png"} alt="img" width={268} height={195}/>
              <div className="w-[242px] px-[12px] py-[8px]">
                <a href="#" className="text-[14px] block text-[#46A358] mb-[4px]">September 12  I Read in 6 minutes</a>
                <strong className="text-[20px] block text-[#3D3D3D] font-bold mb-[4px]">Cactus & Succulent Care Tips</strong>
                <span className="text-[14px] block text-[#727272] mb-[9px]">Cacti are succulents are easy care plants for any home or patio. </span>
                <a className="flex items-center hover:text-green-500 duration-300 gap-[3px]" href="#">
                  <span>Read More</span>
                  <RightIcon/>
                </a>
              </div>
            </li>
            <li className="w-[368px] bg-[#FBFBFB]">
              <Image style={{width:"auto", height:"auto"}} src={"/images/poas2.png"} alt="img" width={268} height={195}/>
              <div className="w-[242px] px-[12px] py-[8px]">
                <a href="#" className="text-[14px] block text-[#46A358] mb-[4px]">September 13  I Read in 2 minutes</a>
                <strong className="text-[20px] block text-[#3D3D3D] font-bold mb-[4px]">Top 10 Succulents for Your Home</strong>
                <span className="text-[14px] block text-[#727272] mb-[9px]">Best in hanging baskets. Prefers medium to high light.</span>
                <a className="flex items-center hover:text-green-500 duration-300 gap-[3px]" href="#">
                  <span>Read More</span>
                  <RightIcon/>
                </a>
              </div>
            </li>
            <li className="w-[368px] bg-[#FBFBFB]">
              <Image style={{width:"auto", height:"auto"}} src={"/images/poast3.png"} alt="img" width={268} height={195}/>
              <div className="w-[242px] px-[12px] py-[8px]">
                <a href="#" className="text-[14px] block text-[#46A358] mb-[4px]">September 15  I Read in 3 minutes</a>
                <strong className="text-[20px] block text-[#3D3D3D] font-bold mb-[4px]">Cacti & Succulent Care Tips</strong>
                <span className="text-[14px] block text-[#727272] mb-[9px]">Cacti and succulents thrive in containers and because most are. </span>
                <a className="flex items-center hover:text-green-500 duration-300 gap-[3px]" href="#">
                  <span>Read More</span>
                  <RightIcon/>
                </a>
              </div>
            </li>
            <li className="w-[368px] bg-[#FBFBFB]">
              <Image style={{width:"auto", height:"auto"}} src={"/images/poast4.png"} alt="img" width={268} height={195}/>
              <div className="w-[242px] px-[12px] py-[8px]">
                <a href="#" className="text-[14px] block text-[#46A358] mb-[4px]">September 15  I Read in 2 minutes</a>
                <strong className="text-[20px] block text-[#3D3D3D] font-bold mb-[4px]">Best Houseplants Room by Room</strong>
                <span className="text-[14px] block text-[#727272] mb-[9px]">The benefits of houseplants are endless. In addition to.. </span>
                <a className="flex items-center hover:text-green-500 duration-300 gap-[3px]" href="#">
                  <span>Read More</span>
                  <RightIcon/>
                </a>
              </div>
            </li>
          </ul>
        </section>
    </main>
    <Footer/>
    </>
  )
}
