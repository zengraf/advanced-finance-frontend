import React from "react";
import TransactionsList from "./TransactionsList";


function TransactionsScreen(){
  return <div className="absolute w-full h-full flex justify-between items-stretch rounded-xl border border-gray-200 bg-white shadow overflow-hidden">
    <TransactionsList />
  </div>
}
export default TransactionsScreen;