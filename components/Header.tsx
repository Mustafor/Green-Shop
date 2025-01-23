"use client"
import React, { FormEvent, useContext, useState } from 'react'
import Button from './Button'
import Modal from './Modal'
import LoginInputs from './LoginInput/LoginInputs'
import RegisterInputs from './RegisterInputs/RegisterInputs'
import VerifyRegister from './VerifyRegister/VerifyRegister'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import ResetPassword from './ResetPassword/ResetPassword'
import { instance } from '@/hook/useInstance'
import { BasketIcon, LikeIcon, LoginIcon, LogoIcon, SearchIcon } from '@/public/icon/Icon'
import { Context } from '@/context/AuthContext'
import { toast } from 'react-toastify'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Badge } from '@nextui-org/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Header = () => {
  const querClinet = useQueryClient()
  const {setToken, token} = useContext(Context)
  const [registerEmail, setRegisterEmail] = useState<string>("")
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const router = useRouter()
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
        querClinet.invalidateQueries({queryKey:['products']})
        toast.success("Login successfuly!")
      }).catch((err) => {
        toast.error("Login failed. Try again")
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

  const getLikeList = async () => {
    const data = await instance().get(`/wishlist`, {
      headers:{"Authorization" : `Bearer ${token}`},
      params:{page:1, limit:1000
      }}).then(res => res.data.ProductId)
    return data
  }

  const {data:likeProducts = []} = useQuery({
     queryKey:['liked_list'],
     queryFn:() => token ? getLikeList() : []
  })

  const {data: BasketProducts = []} = useQuery({
    queryKey: ['basket_list'],
    queryFn: () => token ? instance().get(`/basket`, {
      headers:{"Authorization":`Bearer ${token}`},
      params:{page:1, limit: 10000}
    }).then(res => res.data.ProductId) : []
  })

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
            <Link className='font-medium text-[16px] text-[#3D3D3D] border-b-[3px] border-b-transparent hover:border-b-[3px] block hover:text-[#46A358] hover:border-b-[#46A358] duration-300' href={"/"}>Home</Link>
          </li>
          <li>
            <Link className='font-medium text-[16px] text-[#3D3D3D] border-b-[3px] border-b-transparent hover:border-b-[3px] block hover:text-[#46A358] hover:border-b-[#46A358] duration-300' href={"/shop"}>Shop</Link>
          </li>
          <li>
            <Link className='font-medium text-[16px] text-[#3D3D3D] border-b-[3px] border-b-transparent hover:border-b-[3px] block hover:text-[#46A358] hover:border-b-[#46A358] duration-300' href={"/planet-care"}>Plant Care</Link>
          </li>
          <li>
            <Link className='font-medium text-[16px] text-[#3D3D3D] border-b-[3px] border-b-transparent hover:border-b-[3px] block hover:text-[#46A358] hover:border-b-[#46A358] duration-300' href={"/blog"}>Blogs</Link>
          </li>
        </ul>
        <div className='flex items-center gap-[30px]'>
          <button>
          <SearchIcon/>  
          </button>  
          <button className='text-red-500'>
          <Badge color="success" className='text-white' content={token ? (likeProducts.length ? likeProducts.length : "") : ""}>
            <LikeIcon/>
          </Badge>   
          </button>       
          <button onClick={() => router.push("/shop/shopping-cart")} className='text-green-500'>
          <Badge color="success" className='text-white' content={token ? (BasketProducts.length ? BasketProducts.length : "") : ""}>
            <BasketIcon/>
          </Badge>
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
      <span className='border-b-[2px] border-b-[#46A35880] w-[1140px] block mt-[25px]'></span>
    </header>
  )
}

export default Header
