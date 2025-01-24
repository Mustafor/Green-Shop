"use client";
import React, { ReactNode } from "react";

interface ButtonType {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title: string;
  extraStyle?: string;
  onClick?: () => void;
  type: "submit" | "button" | "reset";
}

const Button: React.FC<ButtonType> = ({
  leftIcon,
  title,
  rightIcon,
  extraStyle,
  onClick,
  type,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${extraStyle} hover:scale-[1.1] duration-300 bg-[#46A358] text-white py-[7px] rounded-[6px] px-[17px] font-medium text-[16px] flex items-center justify-center gap-[4px]`}
    >
      {leftIcon && leftIcon}
      <span>{title}</span>
      {rightIcon && rightIcon}
    </button>
  );
};

export default Button;
