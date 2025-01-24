"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
} from "react";

interface ContextType {
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
  count: number;
  setCount: React.Dispatch<SetStateAction<number>>;
  isBasket: boolean;
  setIsBasket: React.Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<ContextType>({
  token: null,
  setToken: () => {},
  count: 0,
  setCount: () => {},
  isBasket: false,
  setIsBasket: () => {},
});

export const AuthContext: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [isBasket, setIsBasket] = useState<boolean>(false);

  useEffect(() => {
    // Check if we are in a browser environment
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedCount = localStorage.getItem("count");

      if (storedToken) setToken(storedToken);
      if (storedCount) setCount(Number(storedCount));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }

      if (count >= 0) {
        localStorage.setItem("count", String(count));
      }
    }
  }, [token, count]);

  return (
    <Context.Provider
      value={{ token, setToken, count, setCount, isBasket, setIsBasket }}
    >
      {children}
    </Context.Provider>
  );
};
