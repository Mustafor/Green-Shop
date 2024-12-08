"use client"
import React from 'react'
import Input from '../Input'
import Button from '../Button'

const RegisterInputs = () => {
  return (
    <>
      <p className="text-[13px] mb-[14px]">Enter your email and password to register.</p>
      <Input extraClass="mt-[15px]" placeholder="User name" type="text" name="username" />
      <Input extraClass="mt-[15px]" placeholder="Enter email" type="email" name="email" />
      <Input extraClass="mt-[15px]" placeholder="Password" type="password" name="password" />
      <Input extraClass="mt-[15px]" placeholder="Confirm Password" type="password" name="confirm_password" />
      <Button extraStyle="!w-full mt-[27px]" title="Register" type="submit" />
    </>
  );
};
 

export default RegisterInputs