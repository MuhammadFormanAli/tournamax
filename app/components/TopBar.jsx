'use client'
import Link from "next/link";
import React from "react";

const TopBar = () => {
  return (
    
      <div className="flex w-full max-w-[700px] mx-auto border shadow-xl justify-between items-center bg-[black] px-[22px] py-[15px] text-white mt-[20px]">
        <h1 className="  text-[36px] font-bold">Todo App</h1>
        <Link href="/add-todo"  className="px-[20px] py-[14px] bg-[#707070] text-[18px] font-semibold" >Add Todo</Link>
    </div>
  );
};

export default TopBar;
