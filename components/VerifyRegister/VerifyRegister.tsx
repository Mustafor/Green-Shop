"use client"
import React from 'react'
import Input from '../Input'
import Button from '../Button'

interface VerifyRegisterType{
  registerEmail:string
}

const VerifyRegister:React.FC<VerifyRegisterType> = ({registerEmail}) => {
  return (
    <>
      <p className='text-[13px] mb-[14px]'>Verify your email ({registerEmail}).</p>
      <Input extraClass="mt-[15px]" placeholder="Enter code" type="text" name="code"/>
      <Button extraStyle="!w-full mt-[27px]" title="Login" type="submit"/>
    </>
  )
}

export default VerifyRegister