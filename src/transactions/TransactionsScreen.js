import React from "react";
import TransactionsList from "./TransactionsList";

function TransactionsScreen(){
  return <div className="w-full shadow overflow-x-auto sm:rounded-xl bg-white">
    <TransactionsList/>
  </div>
}
export default TransactionsScreen;