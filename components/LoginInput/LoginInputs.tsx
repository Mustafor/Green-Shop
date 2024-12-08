"use client"
import React, { SetStateAction } from 'react'
import Input from '../Input'
import Button from '../Button'

interface LoginType {
  setIsLogin:React.Dispatch<SetStateAction<"login" | "register" | "verifyRegister" | "forgotPassword" | "reset-password">>
}

const LoginInputs:React.FC<LoginType> = ({setIsLogin}) => {
  return (
    <>
      <p className='text-[13px] mb-[14px]'>Enter your username and password to login.</p>
      <Input extraClass="mt-[15px]" placeholder="Enter Email" type="email" name="email"/>
      <Input extraClass="mt-[15px]" placeholder="*******" type="password" name="password"/>
      <p onClick={() => setIsLogin("forgotPassword")} className='text-[14px] text-[#46A358] text-end mt-[14px] cursor-pointer'>Forgot Passoword?</p>
      <Button extraStyle="!w-full mt-[27px]" title="Login" type="submit"/>
    </>
  )
}

export default LoginInputs