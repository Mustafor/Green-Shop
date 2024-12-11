"use client"
import React from 'react'
import Input from '../Input'
import Button from '../Button'

const ResetPassword = () => {
  return (
    <>
      <Input extraClass="mt-[15px]" placeholder="Enter new password" type="password" name="new_password"/>
      <Input extraClass="mt-[15px]" placeholder="Enter code" type="text" name="otp"/>
      <Button extraStyle="!w-full mt-[27px]" title="Login" type="submit"/>  
    </>
  )
}

export default ResetPassword