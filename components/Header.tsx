"use client"
import React, { FormEvent, useContext, useState } from 'react'
import Button from './Button'
import Modal from './Modal'
import LoginInputs from './LoginInput/LoginInputs'
import RegisterInputs from './RegisterInputs/RegisterInputs'
import VerifyRegister from './VerifyRegister/VerifyRegister'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import ResetPassword from './ResetPassword/ResetPassword'
import { instance } from '@/hook/instance'
import { KorzinaIcon, LoginIcon, LogoIcon, SearchIcon } from '@/public/icon/Icon'
import { Context } from '@/context/AuthContext'

const Header = () => {
  const {setToken} = useContext(Context)
  const [registerEmail, setRegisterEmail] = useState<string>("")
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<"login" | "register" | "verifyRegister" | "forgotPassword" | "reset-password">("login")

  function loginSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(isLogin == "login"){
      const data = {
        password:(e.target as HTMLFormElement).password.value,
        usernameoremail:(e.target as HTMLFormElement).email.value
      }
      instance().post("/login", data).then((res) => {
        setLoginModal(false)
        setToken(res.data.access_token)
      })
    }
    else if(isLogin == "register"){
      const data = {
        firstName:(e.target as HTMLFormElement).username.value,
        lastName:(e.target as HTMLFormElement).username.value,
        email:(e.target as HTMLFormElement).email.value,
        password:(e.target as HTMLFormElement).password.value,
      }
      if((e.target as HTMLFormElement).password.value == (e.target as HTMLFormElement).confirm_password.value){
        instance().post("/register", data).then(() => {
          setRegisterEmail(data.email)
          setIsLogin("verifyRegister")
        })
      }
      else{
        alert("Password must be same !")
      }
    }
    else if(isLogin == "verifyRegister"){
      const data = {
        email:registerEmail,
        code:(e.target as HTMLFormElement).code.value
      }
      instance().post("/users/verify", {}, {
        params:data
      }).then(() => setIsLogin("login"))
    }
    else if(isLogin == "forgotPassword"){
      const email = (e.target as HTMLFormElement).email.value
      instance().post(`/forgot/${email}`, {}).then(() => {
        setRegisterEmail(email)
        setIsLogin("reset-password")
      })
    }
    else if(isLogin == "reset-password"){
      const data = {
        email:registerEmail,
        password:(e.target as HTMLFormElement).password.value,
        otp:(e.target as HTMLFormElement).otp.value
      }
      instance().put(`/reset-password`, data).then(() => setIsLogin("login"))
    }
  }

  return (
    <header className='px-[120px] py-[25px]'>
      <div className='flex items-center  justify-between'>
        <div>
        <a href='/'>
          <LogoIcon/>
        </a>
        </div>
        <ul className='flex items-center gap-[50px]'>
          <li>
            <a className='font-medium text-[16px] text-[#3D3D3D] border-b-[3px] border-b-transparent hover:border-b-[3px] block hover:text-black hover:border-b-[#46A358] duration-300' href="#">Home</a>
          </li>
          <li>
            <a className='font-medium text-[16px] text-[#3D3D3D] border-b-[3px] border-b-transparent hover:border-b-[3px] block hover:text-black hover:border-b-[#46A358] duration-300' href="#">Shop</a>
          </li>
          <li>
            <a className='font-medium text-[16px] text-[#3D3D3D] border-b-[3px] border-b-transparent hover:border-b-[3px] block hover:text-black hover:border-b-[#46A358] duration-300' href="#">Plant Care</a>
          </li>
          <li>
            <a className='font-medium text-[16px] text-[#3D3D3D] border-b-[3px] border-b-transparent hover:border-b-[3px] block hover:text-black hover:border-b-[#46A358] duration-300' href="#">Blogs</a>
          </li>
        </ul>
        <div className='flex items-center gap-[30px]'>
          <button>
          <SearchIcon/>  
          </button>          
          <button>
          <KorzinaIcon/>
          </button>
      <Button onClick={() => setLoginModal(true)} title="Login" type="button" leftIcon={<LoginIcon />} />
      <Modal isOpen={loginModal} setIsOpen={setLoginModal} width={500}>
        <ul className='flex items-center justify-center gap-2.5 mb-[53px]'>
          <li onClick={() => setIsLogin("login")} className={`${isLogin == "login" && "text-[#46A358]"} font-medium text-[20px] cursor-pointer`}>Login</li>
          <li className='w-[1px] h-[16px] bg-black'></li>
          <li onClick={() => setIsLogin("register")} className={`${isLogin == "register" && "text-[#46A358]"} font-medium text-[20px] cursor-pointer`}>Register</li>
        </ul>
        <form autoComplete="off" onSubmit={loginSubmit} className='w-[300px] mx-auto'>
          {isLogin == "login" && <LoginInputs setIsLogin={setIsLogin} />}
          {isLogin == "register" && <RegisterInputs />}
          {isLogin == "verifyRegister" && <VerifyRegister registerEmail={registerEmail} />}
          {isLogin == "forgotPassword" && <ForgotPassword />}
          {isLogin == "reset-password" && <ResetPassword />}
        </form>
      </Modal>
      </div>
      </div>
    </header>
  )
}

export default Header
