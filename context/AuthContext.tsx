"use client"
import { createContext, ReactNode, SetStateAction, useState } from "react"

interface ContextType {
  token: string | null
  setToken: React.Dispatch<SetStateAction<null | string>>
  cart: any[]
  setCart: React.Dispatch<SetStateAction<any[]>>
}

export const Context = createContext<ContextType>({
  token: null,
  setToken: () => "",
  cart: [],
  setCart: () => []
})

export const AuthContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null)
  const [cart, setCart] = useState<any[]>([])
  
  if (token) localStorage.setItem("token", token)

  return <Context.Provider value={{ token, setToken, cart, setCart }}>{children}</Context.Provider>
}
