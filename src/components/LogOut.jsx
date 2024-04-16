"use client";
import { signOut } from "next-auth/react";

const LogOut = () => {
  return (
    <button
      className="text-[#FF0000] font-bold text-[14px] rounded-[5px] px-[50px] py-[10px] border-[#FF0000] border-[1px] w-min mt-[20px]"
      onClick={() => signOut()}
    >
      Keluar
    </button>
  );
};

export default LogOut;
