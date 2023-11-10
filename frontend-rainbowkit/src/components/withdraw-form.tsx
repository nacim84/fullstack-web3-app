"use client"
import { contractAddress } from "@/constants/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Bank from "../abi/Bank.json";
import { useToast } from "./ui/use-toast";
import { useAccount } from "wagmi";
import { prepareWriteContract, writeContract, readContract, fetchBalance } from '@wagmi/core';
import { parseEther } from "viem/utils";
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
 withdrawAmount: z.string().min(1, {
  message: "Amount must be at least 1 characters.",
 }),
})

export const WithdrawForm = () => {
 const bankAbi = Bank.abi;
 console.log(bankAbi);
 const { toast } = useToast();
 const { address, isConnected } = useAccount();

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   withdrawAmount: "",
  },
 });

 // Withdraw handler
 const withdrawHandler = async (values: z.infer<typeof formSchema>) => {
  try {
   const { request } = await prepareWriteContract({
    address: contractAddress,
    abi: bankAbi,
    functionName: 'withdraw',
    args: [parseEther(values.withdrawAmount)]
   })
   const { hash } = await writeContract(request);
   console.log("Hash : " + hash);

   toast({
    title: 'Congratulations',
    description: "You have withdrawed ethers from the contract.",
   })
  }
  catch (err) {
   console.log(err)
   toast({
    title: 'Error',
    description: "An error occured.",
   })
  }
 }


 return (
  <div className="p-6 bg-violet-950/30 rounded-xl shadow-xl min-w-[40vw] h-full m-auto flex flex-col gap-20">
   <Form {...form}>
    <form onSubmit={form.handleSubmit(withdrawHandler)} className="space-y-4">
     <FormField
      control={form.control}
      name="withdrawAmount"
      render={({ field }) => (
       <FormItem>
        <FormLabel className="text-white">WithdrawAmount</FormLabel>
        <FormControl>
         <Input placeholder="WithdrawAmount" className="rounded-full" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <Button type="submit" disabled={!isConnected} className="w-full bg-fuchsia-500/40 rounded-full transition duration-150 hover:bg-fuchsia-400/40">Withdraw</Button>
    </form>
   </Form>
  </div>
 )
};