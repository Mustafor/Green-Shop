"use client"
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

const layout:React.FC<{children:ReactNode}> = ({children}) => {
    const path = usePathname()

  return (
    <div>
        <div className='px-[120px] text-[15px]'><span className='text-black font-bold'>Home</span> / Shop {path.includes("shopping-cart") && "/ Shopping Cart"}</div>
        {children}
    </div>
  )
}

export default layout