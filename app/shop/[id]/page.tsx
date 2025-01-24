"use client";
import CaruselShop from "@/components/CaruselShop/page";
import Footer from "@/components/Footer";
import { Context } from "@/context/AuthContext";
import { instance } from "@/hook/useInstance";
import {
  CartLikeIcon,
  FaceebookShareIcon,
  LinkedinShareIcon,
  MessageShareIcon,
  SearchIcon,
  StarIcon,
  StartNoActiveIcon,
  TwitterShareIcon,
} from "@/public/icon/Icon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const page = () => {
  const { count, setCount, token, setIsBasket } = useContext(Context);
  const { id } = useParams();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["get_single_products"],
    queryFn: () =>
      instance()
        .get(`/product/${id}`)
        .then((res) => res.data),
  });
  if (!data || !data.image_url) {
    return <div>No data</div>;
  }

  const handleAddToCart = () => {
    const data = {
      productId: id,
      quantity: count,
    };
    instance()
      .post("/basket", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCount((prevCount) => prevCount + count);
        setIsBasket(true);
        router.push("/shop/shopping-cart");
        toast.success("Item added to cart");
      });
  };

  return (
    <>
      <div className="flex gap-[52px] px-[120px] py-[43px]">
        {data.image_url && (
          <div className="w-[573px] flex rounded-lg justify-between bg-[#FBFBFB]">
            <Image
              className="p-[20px] flex justify-center"
              priority
              style={{ width: "404px", height: "404px" }}
              src={data.image_url[0]}
              alt={data.product_name || "Flower"}
              width={404}
              height={404}
            />
            <span className="px-[19px] cursor-pointer py-[19px]">
              <SearchIcon />
            </span>
          </div>
        )}
        <div className="w-[574px]">
          <h2 className="text-[28px] font-bold text-[#3D3D3D]">
            {data.product_name}
          </h2>
          <div className="flex items-center justify-between">
            <strong className="text-[#46A358] text-[22px] font-bold">
              ${data.cost}.00
            </strong>
            <div className="flex items-center gap-[3px]">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StartNoActiveIcon />
              <span className="text-[15px] text-[#3D3D3D]">
                19 Customer Review
              </span>
            </div>
          </div>
          <span className="border-b-[2px] w-[573px] border-b-[#46A35880] block mt-[11px]"></span>
          <strong className="mt-[15px] block text-[15px] mb-[10px] font-medium">
            Short Description:
          </strong>
          <p className="text-[#727272] text-[14px] mb-[24px]">
            {data.short_description}
          </p>
          <span className="text-[15px] text-[#3D3D3D] mb-[11px]">Size</span>
          <div className="flex items-center gap-[10px] py-[15px]">
            {data.size.map((item: string) => (
              <div
                key={data.product_id}
                className="w-[28px] cursor-pointer flex items-center justify-center h-[28px] rounded-full border-[2px] border-[#EAEAEA] hover:text-[#46A358] hover:border-[#46A358] duration-300"
              >
                <span
                  key={item[0]}
                  className="text-[14px] hover:text-[#46A358] duration-300 font-bold text-[#727272]"
                >
                  {item[0]}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-[26px]">
            <div className="flex items-center gap-[23px] py-[23px]">
              <button
                onClick={() =>
                  setCount((prevCount) => Math.max(prevCount - 1, 0))
                }
                className="w-[33px] h-[33px] bg-[#46A358] rounded-full text-[18px] text-white font-bold"
              >
                -
              </button>
              <span>{count}</span>
              <button
                onClick={() => setCount((prevCount) => prevCount + 1)}
                className="w-[33px] h-[33px] bg-[#46A358] rounded-full text-[18px] text-white font-bold"
              >
                +
              </button>
            </div>
            <div className="flex items-center gap-[10px]">
              <button className="bg-[#46A358] flex items-center justify-center rounded-md w-[130px] border-[2px] border-[#46A358] duration-300 hover:bg-transparent hover:text-[#46A358] py-[10px] text-[14px] font-bold text-white">
                BUY NOW
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-transparent border-[2px] border-[#46A358] hover:bg-[#46A358] duration-300 hover:text-white rounded-md w-[130px] py-[10px] text-[14px] font-bold text-[#46A358]"
              >
                Add to cart
              </button>
              <button className="w-[40px] h-[40px] flex items-center justify-center duration-300 hover:shadow-2xl rounded-md bg-transparent border-[2px] border-[#46A358]">
                <CartLikeIcon />
              </button>
            </div>
          </div>
          <div>
            <strong className="text-[15px] mt-[26px] mb-[10px] text-[#727272]">
              SKU: 1995751877966
            </strong>
          </div>
          <div>
            <strong className="text-[15px] mt-[26px] mb-[10px] text-[#727272]">
              Categories: Potter Plants
            </strong>
          </div>
          <div>
            <strong className="text-[15px] mt-[26px] mb-[10px] text-[#727272]">
              Tags: {data.tags}
            </strong>
          </div>
          <div className="flex items-center gap-[16px]">
            <strong className="text-[15px] flex items-center gap-[20px] mt-[18px] text-[#3D3D3D]">
              Share this product:
              <span className="cursor-pointer">
                <FaceebookShareIcon />
              </span>
              <span className="cursor-pointer">
                <TwitterShareIcon />
              </span>
              <span className="cursor-pointer">
                <LinkedinShareIcon />
              </span>
              <span className="cursor-pointer">
                <MessageShareIcon />
              </span>
            </strong>
          </div>
        </div>
      </div>
      <div className="px-[120px] py-[105px]">
        <div className="flex items-center gap-[30px]">
          <strong className="text-[17px] border-b-[3px] border-b-transparent hover:border-b-[#46A358] hover:text-[#46A358] duration-300 w-[161px] block text-[#3D3D3D] font-bold">
            Product Description
          </strong>
          <strong className="text-[17px] border-b-[3px] border-b-transparent hover:border-b-[#46A358] hover:text-[#46A358] duration-300 w-[64px] block text-[#3D3D3D] font-bold">
            Reviews
          </strong>
        </div>
        <span className="border-b-[2px] border-b-[#46A35880] block w-[1140px]"></span>
        <p className="text-[14px] text-[#727272] mt-[18px]">
          {data.product_description}
        </p>
      </div>
      <CaruselShop />
      <Footer />
    </>
  );
};

export default page;
