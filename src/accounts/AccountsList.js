import React, {useState} from 'react'
import AccountItem from "./AccountItem";
import {useAccounts, setAccounts} from "./AccountsHook";
import RandomCurrencyLoader from "../utilities/RandomCurrencyLoader";
import {PlusIcon} from "@heroicons/react/solid";
import AccountDialog from "./AccountDialog";

const headers = [
  {name: "ID", key: 'id'},
  {name: "Account", key: 'name'},
  {name: "Amount", key: 'amount'},
  {name: "Currency", key: 'currency.code'},
]

function AccountsList() {
  const accounts = useAccounts()
  
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [showNew, setShowNew] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  return <>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
      <tr>
        {headers.map(header =>
          <th
            key={header.key}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            {header.name}</th>
        )}
        <th
          scope="col"
          onClick={() => setShowNew(true)}
          className="mt-0.5 relative flex items-center justify-end px-6 py-2.5 cursor-pointer text-right text-sm font-medium text-blue-600 hover:text-blue-900"
        >
          <PlusIcon className="h-5 w-5 inline-block fill-current"/> Add
        </th>
      </tr>
      </thead>
      <tbody>
      {accounts.data && accounts.data.map(account => (
        <AccountItem 
          key={account.id} 
          account={account}
          onEdit={() => {
            setSelectedAccount(account);
            setShowEdit(true)
          }}
        />
      ))}
      </tbody>
    </table>
    <AccountDialog
      isOpen={showEdit}
      onClose={() => setShowEdit(false)}
      account={selectedAccount}
      onSave={result => {
        setAccounts(oldAccounts => {
          oldAccounts.data.splice(oldAccounts.data.findIndex(account => account.id === result.id), 1, result)
          return oldAccounts
        })
        setShowEdit(false)
      }}
    />
    <AccountDialog
      isOpen={showNew}
      onClose={() => setShowNew(false)}
      onSave={result => {
        setAccounts(oldAccounts => ({data: [result, ...oldAccounts.data]}))
        setShowNew(false)
      }}
    />
    {accounts.loading &&
    <div className="h-16 w-full flex justify-center items-center">
      <RandomCurrencyLoader className="w-8 h-8 text-gray-700 fill-current"/>
    </div>
    }
    {accounts.error &&
    <div className="h-16 w-full flex justify-center items-center bg-gray-100 text-gray-600">
      <p>{accounts.error}</p>
    </div>
    }
  </>
}

export default AccountsList;