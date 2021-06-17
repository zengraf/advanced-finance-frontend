import React from "react";
import AccountItem from "./AccountItem";
import {useAccounts} from "./AccountsHook";
import RandomCurrencyLoader from "../utilities/RandomCurrencyLoader";

const headers = [
  {name: "ID", key: 'id'},
  {name: "Account", key: 'name'},
  {name: "Amount", key: 'amount'},
  {name: "Currency", key: 'currency.code'},
]

function AccountsList() {
  const accounts = useAccounts()

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
      </tr>
      </thead>
      <tbody>
      {accounts.data &&
        accounts.data.map(account => (<AccountItem key={account.id} account={account}/>))
      }
      </tbody>
    </table>
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