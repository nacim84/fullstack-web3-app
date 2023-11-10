import React, { useState } from 'react'
import { fetchBalance } from '@wagmi/core';
import { contractAddress } from '@/constants/constants';
import { useAccount, usePublicClient } from "wagmi";
import Bank from "../abi/Bank.json";
import { Button } from './ui/button';
import { Input } from './ui/input';

export const GetBalances = () => {
 const bankAbi = Bank.abi;
 console.log(bankAbi);
 const { address, isConnected } = useAccount();

 // Client Viem
 const client = usePublicClient();

 // Balance of the user State
 const [userBalance, setUserBalance] = useState("");
 const [contractBalance, setContractBalance] = useState("");

 // Get contract balance
 const getContractBalanceHandler = async () => {
  try {
   const data = await fetchBalance({
    address: contractAddress as `0x${string}`,
   });

   console.log("Data contract : " + JSON.stringify(String(data.value)));
   setContractBalance(String(data.value));
   return data
  }
  catch (err) {
   console.log(err)
  }
 }

 // Get user balance
 const getUserBalanceHandler = async () => {
  try {
   // const walletClient = await getWalletClient();
   console.log("Account : " + address);
   const data = await client.readContract({
    address: contractAddress as `0x${string}`,
    abi: bankAbi,
    functionName: 'getBalanceOfUser',
    account: address as `0x${string}`,
   });

   console.log("Data user : " + JSON.stringify(String(data)));
   setUserBalance(String(data));
   return data
  }
  catch (err) {
   console.log(err)
  }
 }
 return (
  <div className="p-6 bg-violet-950/30 rounded-xl shadow-xl min-w-[60vw] h-full m-auto flex flex-col gap-10">
   <div className="flex justify-between items-center gap-4">
    <Button type="submit" size="sm" onClick={getContractBalanceHandler} disabled={!isConnected} className="w-full bg-fuchsia-500/40 hover:bg-fuchsia-400/40 rounded-full transition duration-150">Get contract balance</Button>
    <Input className="min-w-lg h-8 rounded-full" value={contractBalance} />
   </div>
   <div className="flex justify-between items-center gap-4">
    <Button type="submit" size="sm" onClick={getUserBalanceHandler} disabled={!isConnected} className="w-full bg-fuchsia-500/40 hover:bg-fuchsia-400/40 rounded-full transition duration-150">Get user balance</Button>
    <Input className="min-w-lg h-8 rounded-full" value={userBalance} />
   </div>
  </div>
 )
};