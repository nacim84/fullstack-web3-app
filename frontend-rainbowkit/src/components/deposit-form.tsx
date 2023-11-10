"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAccount, usePublicClient } from "wagmi"
import { prepareWriteContract, writeContract, readContract, fetchBalance } from '@wagmi/core';
import { useToast } from "./ui/use-toast";
import { contractAddress } from "@/constants/constants";
import Bank from "../abi/Bank.json";
import { parseEther, parseAbiItem } from 'viem';

const formSchema = z.object({
 depositAmount: z.string().min(1, {
  message: "Amount must be at least 1 characters.",
 }),
})

export function DepositForm() {

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   depositAmount: "",
  },
 });

 const bankAbi = Bank.abi;
 console.log(bankAbi);
 const { toast } = useToast();
 const { address, isConnected } = useAccount();

 // Client Viem
 const client = usePublicClient();

 // Deposit handler
 const depositHandler = async (values: z.infer<typeof formSchema>) => {
  try {
   const { request } = await prepareWriteContract({
    address: contractAddress,
    abi: bankAbi,
    functionName: 'deposit',
    value: parseEther(values.depositAmount)
   });
   const { hash } = await writeContract(request);
   console.log("Hash : " + hash);

   toast({
    title: 'Congratulations',
    description: "You have deposited ethers on the contract.",
   })
  } catch (err) {
   console.log(err)
   toast({
    title: 'Error',
    description: "An error occured.",
   })
  }
 };

 // Get all the events with Viem
 const getEvents = async () => {
  // Deposit
  const depositLogs = await client.getLogs({
   address: contractAddress,
   event: parseAbiItem('event etherDeposited(address indexed account, uint amount)'),
   // fromBlock: BigInt(Number(await client.getBlockNumber()) - 15000),
   fromBlock: BigInt(0),
   toBlock: 'latest'
  });

  console.log("DepositLogs : " + depositLogs);
  // setDepositEvents(depositLogs
  //  .map(
  //  log => ({
  //   address: log.args.account,
  //   amount: log.args.amount
  //  })
  // ))

  // Withdraw
  // const withdrawLogs = await client.getLogs({
  //  address: contractAddress,
  //  event: parseAbiItem('event etherWithdrawed(address indexed account, uint amount)'),
  //  // fromBlock: BigInt(Number(await client.getBlockNumber()) - 15000),
  //  fromBlock: 0n,
  //  toBlock: 'latest'
  // })
  // setWithdrawEvents(withdrawLogs.map(
  //  log => ({
  //   address: log.args.account,
  //   amount: log.args.amount
  //  })
  // ))
 }

 return (
  <div className="p-6 bg-violet-950/30 rounded-xl shadow-xl min-w-[40vw] h-full m-auto flex flex-col gap-20">
   <Form {...form}>
    <form onSubmit={form.handleSubmit(depositHandler)} className="space-y-4">
     <FormField
      control={form.control}
      name="depositAmount"
      render={({ field }) => (
       <FormItem>
        <FormLabel className="text-white">DepositAmount</FormLabel>
        <FormControl>
         <Input placeholder="DepositAmount" className="rounded-full" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <Button type="submit" disabled={!isConnected} className="w-full bg-fuchsia-500/40 rounded-full transition duration-150 hover:bg-fuchsia-400/40">Deposit</Button>
    </form>
   </Form>

  </div>
 )
}