"use client";

import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { DepositForm } from "./deposit-form";
import { cn } from "@/lib/utils";
import { WithdrawForm } from "./withdraw-form";
import { GetBalances } from "./get-balances";


export const HeroContent = () => {

 const { address, isConnected } = useAccount();
 return (
  <motion.div
   initial="hidden"
   animate="visible"
   className="flex flex-col items-center justify-center gap-10 px-20 mt-40 w-full z-[20]"
  >
   <h3 className={cn("text-xl font-bold text-white py-4 px-10 rounded-full shadow-lg", isConnected ? "bg-violet-950/40" : "bg-red-300/40")}>
    {isConnected ? `Vous etes déjà connecté : ${address}` : "Merci de te connecter à ta Wallet"}
   </h3>
   <div className="grid grid-cols-2 gap-4">
    <DepositForm />
    <WithdrawForm />
   </div>
   <GetBalances />
   {/* <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
    <motion.div
     variants={slideInFromLeft(0.5)}
     className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
    >
     <span>
      Providing
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
       {" "}
       the best{" "}
      </span>
      project experience
     </span>
    </motion.div>

    <motion.p
     variants={slideInFromLeft(0.8)}
     className="text-lg text-gray-400 my-5 max-w-[600px]"
    >
     I&apos;m a Full Stack Software Engineer with experience in Website,
     Mobile, and Software development. Check out my projects and skills.
    </motion.p>
    <motion.a
     variants={slideInFromLeft(1)}
     className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
    >
     Learn More!
    </motion.a>
   </div> */}
  </motion.div>
 );
};
