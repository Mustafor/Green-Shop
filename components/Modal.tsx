"use client";
import { CloseIcon } from "@/public/icon/Icon";
import React, { ReactNode, SetStateAction } from "react";

interface ModalType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  width: number;
  children: ReactNode;
}

const Modal: React.FC<ModalType> = ({ isOpen, setIsOpen, width, children }) => {
  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "wrapper") {
      setIsOpen(false);
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      id="wrapper"
      className={`fixed z-50 inset-0 duration-300 backdrop-blur bg-[#00000029] flex items-center justify-center ${
        !isOpen && "scale-0"
      }`}
    >
      <div
        style={{ width: `${width}px` }}
        className="absolute p-5 bg-white rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-[11px] right-3"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
