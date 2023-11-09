import Image from "next/image";
import React from "react";
import { CustomConnectWallet } from "./custom-connect-wallet";

export const Navbar = () => {
 return (
  <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
   <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
    <a
     href="/"
     className="h-auto w-auto flex flex-row items-center"
    >
     <span className="text-xl font-bold ml-[10px] hidden md:block text-gray-300">
      Voting-Dev-Projet#3
     </span>
    </a>

    <div className="w-[500px] h-full flex flex-row items-center justify-center mr-32">
     <div className="flex items-center justify-center w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
      <CustomConnectWallet />
     </div>
    </div>
    <div className="flex flex-row gap-5">
     <Image
      className="bg-violet-400/50 p-1 rounded-full"
      src="/discord.svg"
      alt="Discord"
      key="Discord"
      width={32}
      height={32}
     />
     <Image
      className="bg-violet-400/50 rounded-full"
      src="/github.svg"
      alt="Github"
      key="Github"
      width={32}
      height={32}
     />

    </div>
   </div>
  </div>
 );
};