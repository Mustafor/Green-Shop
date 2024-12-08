"use client"
import { HidePassIcon, ShowPassIcon } from '@/public/icon/Icon'
import React, { useState } from 'react'

interface InputType {
  placeholder:string
  name:string
  extraClass?:string
  type:"text" | "password" | "email" | "number"
}

const Input:React.FC<InputType> = ({name, placeholder, extraClass, type}) => {
  const [showPass, setShowPass] = useState<boolean>(false)

  return (
    <label className='relative'>
      <input className={`${extraClass} w-full pl-[14px] py-3 rounded-[5px] outline-none focus:border-[#46A358] border-[1px] border-[#EAEAEA]`} required type={type == "password" ? (showPass ? "text" : "password") : type} placeholder={placeholder} name={name}/>
      {type == "password" && 
        <div onClick={() => setShowPass(!showPass)} className={`${showPass ? "" : "hidden" }`}>
          <button type='button' className={`${showPass ? "" : "hidden" }`}><HidePassIcon/></button>
          <button type='button' className={`${showPass ? "hidden" : "" }`}><ShowPassIcon/></button>
        </div>
      }
    </label>
  )
}

export default Input