import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import TransactionItem from "./TransactionItem";
import { index } from './TransactionAPI';


// const transactions = [
//   { id: 50,
//     date: format(new Date(), 'MM/dd/yyyy'),
//     account: {id: 2, name: "Revolut", 
//     currency: {name: "Zloty", code: "PLN"}}, 
//     area: {id: 1, name: "Life"}, 
//     category: {id: 2, name: "Grocery"}, 
//     amount: 130.30, 
//     description: "Zabka XD"}
// ]

function TransactionsList() {
  const [transactions, setTransactions] = useState([])

  useEffect(async () => {
    const result = await index()

    if (result.hasOwnProperty("error")){
      //Display error
    } else {
      setTransactions(result)
    }
  }, [])

  return<div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (<TransactionItem transaction={transaction}/>))}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
    </div>
}

export default TransactionsList;
