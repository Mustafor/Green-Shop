"use client";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import debounce from "@/hook/useDebounce";
import { ProductsType, getProducts } from "@/service/getProducts";
import React, { useState } from "react";
const Shop = () => {
  const [size] = useState<string | null>(null);
  const [price] = useState<number[] | number>([39, 1230]);
  const [categoryName] = useState<string | null>(null);
  const [tags] = useState<string | null>(null);
  const [page] = useState<number>(1);
  const [_, setTotalPage] = useState(10);
  const fullPrice = debounce(price, 1000);

  const products: ProductsType[] = getProducts(
    categoryName,
    tags,
    page,
    setTotalPage,
    fullPrice,
    size
  );

  return (
    <>
      <div className="px-[120px] mt-[50px]">
        <div className="flex flex-col">
          <h2 className="font-bold text-[#46A358] text-[17px]">
            Releted Products
          </h2>
        </div>
        <div className="flex flex-wrap gap-4 mb-[120px] w-full">
          {products ? (
            products.map((item: ProductsType) => (
              <ProductCard item={item} key={item.product_id} />
            ))
          ) : (
            <h1 className="text-[40px] text-[#46A358] text-center mt-[100px] font-bold">
              No Flowers
            </h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
