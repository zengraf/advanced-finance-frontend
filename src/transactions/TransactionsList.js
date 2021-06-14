import React, {useState, useEffect} from 'react'
import TransactionItem from "./TransactionItem";
import {index} from './TransactionAPI';
import {useToken} from "../authentication/TokenHook";
import InfiniteScroll from "react-infinite-scroll-component";
import RandomCurrencyLoader from "../utilities/RandomCurrencyLoader";
import {SwitchVerticalIcon, ArrowSmUpIcon} from "@heroicons/react/solid";


const headers = [
  {name: "ID", key: 'id', sortable: true},
  {name: "Date", key: 'date', sortable: true},
  {name: "Account", key: 'accounts.name', sortable: true},
  {name: "Area", key: 'areas.name', sortable: true},
  {name: "Category", key: 'categories.name', sortable: true},
  {name: "Amount", key: 'amount', sortable: true},
  {name: "Currency", key: 'accounts.currency_id', sortable: true},
  {name: "Description", key: 'description', sortable: false},
  // {name: "", key: 'actions', sortable: false},
]

function TransactionsList() {
  const [transactions, setTransactions] = useState([])
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState(headers[0].key)
  const [ascending, setAscending] = useState(true)

  const token = useToken()

  const reload = () => {
    setCurrentPage(1)
    setTransactions([])
  }

  useEffect(() => {
    let ignore = false

    index(token.data, currentPage, sortBy, ascending ? 'asc' : 'desc').then(result => {
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
  }, [ascending, currentPage, sortBy, token])

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
        {headers.map(header =>
          <th
            key={header.key}
            scope="col"
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.sortable ? 'cursor-pointer' : ''}`}
            onClick={() => {
              if (!header.sortable) return

              reload()
              if (sortBy === header.key)
                setAscending(value => !value)
              else {
                setSortBy(header.key)
                setAscending(true)
              }
            }}
          >
            {header.name}
            {header.sortable &&
              (sortBy === header.key
                  ? <ArrowSmUpIcon
                    className={`ml-1 h-4 w-4 inline-block transition-transform transform ${ascending ? '' : 'rotate-180'}`}/>
                  : <SwitchVerticalIcon className="ml-2 h-4 w-4 inline-block"/>
              )
            }
          </th>
        )}
      </tr>
      </thead>
      <tbody>
      {transactions.map(transaction => (<TransactionItem key={transaction.id} transaction={transaction}/>))}
      </tbody>
    </table>
  </InfiniteScroll>
}

export default TransactionsList;
