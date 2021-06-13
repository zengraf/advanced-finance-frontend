import React, {useState, useEffect} from 'react'
import TransactionItem from "./TransactionItem";
import {index} from './TransactionAPI';
import {useToken} from "../authentication/TokenHook";
import InfiniteScroll from "react-infinite-scroll-component";
import RandomCurrencyLoader from "../utilities/RandomCurrencyLoader";

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
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const token = useToken()

  useEffect(() => {
    let ignore = false

    index(token.data, currentPage).then(result => {
      if (ignore) return

      if (result.hasOwnProperty("error")) {
        //Display error
      } else {
        setPages(result.pages)
        setTransactions(prevTransactions => [...prevTransactions, ...result.items])
      }
    })

    return () => {
      ignore = true;
    }
  }, [currentPage, token])

  return <InfiniteScroll
    next={() => setCurrentPage(prevPage => prevPage + 1)}
    hasMore={currentPage < pages}
    loader={<div className="h-16 w-full flex justify-center items-center">
      <RandomCurrencyLoader className="w-8 h-8 text-gray-700 fill-current"/>
    </div>}
    dataLength={transactions.length}
  >
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
        </th>
        <th scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date
        </th>
        <th scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account
        </th>
        <th scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area
        </th>
        <th scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category
        </th>
        <th scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount
        </th>
        <th scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency
        </th>
        <th scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description
        </th>
      </tr>
      </thead>
      <tbody>
      {transactions.map(transaction => (<TransactionItem key={transaction.id} transaction={transaction}/>))}
      </tbody>
    </table>
  </InfiniteScroll>
}

export default TransactionsList;
