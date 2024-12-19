"use client"
import React, { createContext, useState, useEffect, ReactNode, SetStateAction } from "react"

interface ContextType {
    token: string | null
    setToken: React.Dispatch<SetStateAction<string | null>>
    count: number
    setCount: React.Dispatch<SetStateAction<number>>
    isBasket: boolean
    setIsBasket: React.Dispatch<SetStateAction<boolean>> 
}

export const Context = createContext<ContextType>({
    token: null,
    setToken: () => {},
    count: 0,
    setCount: () => {},
    isBasket: false,
    setIsBasket: () => {} 
})

export const AuthContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null)
    const [count, setCount] = useState<number>(Number(localStorage.getItem("count")) || 0)
    const [isBasket, setIsBasket] = useState<boolean>(false)
    
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token)
        } 
        else{
            localStorage.removeItem("token")
        }
    }, [token])

    useEffect(() => {
        if (count >= 0) {
            localStorage.setItem("count", String(count))
        }
    }, [count])

    return (
        <Context.Provider value={{ token, setToken, count, setCount, isBasket, setIsBasket }}>{children}</Context.Provider>
    )
}
