"use client"
import { Context } from "@/context/AuthContext"
import { instance } from "@/hook/instance"
import { useQuery } from "@tanstack/react-query"
import { SetStateAction, useContext } from "react"

export interface ProductsType {
    basket:boolean
    category_id:string
    cost:number
    count:number
    discount:number
    image_url:string[]
    like:boolean
    product_description:string
    product_id:string
    product_name:string
    product_status:string
    short_description:string
    size:string[]
    tags:string[]
}

interface ParamsType {
    page:number
    limit:number
    cetegory:string | null
    tags:string | null
}

export const getProducts = (categoryName: string | null, tags: string | null, page: number, setTotalPage: React.Dispatch<SetStateAction<number>>) => {
    const { token } = useContext(Context)
    const params: ParamsType = {
        page,
        limit: 6,  
        cetegory: categoryName == "All" ? null : categoryName, 
        tags
    }

    const { data = [] } = useQuery({
        queryKey: ['products', categoryName, tags, page], 
        enabled: true,  
        queryFn: () => instance().get("/products", {
                    headers: token ? { "Authorization": `Bearer ${token}` } : {},
                    params: params,
                })
                .then((res) => {
                    setTotalPage(res.data.total_count)
                    return res.data.products
                })})
        return data
}
