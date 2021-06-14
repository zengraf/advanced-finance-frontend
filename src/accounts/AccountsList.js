import React, {useEffect, useState} from "react";
import {index} from "../accounts/AccountsAPI";
import {useToken} from "../authentication/TokenHook";
import AccountItem from "./AccountItem";

const headers = [
  {name: "ID", key: 'id'},
  {name: "Account", key: 'name'},
  {name: "Amount", key: 'amount'},
  {name: "Currency", key: 'currency.code'},
]

function AccountsList() {
  const [accounts, setAccounts] = useState([])
  const token = useToken()

  useEffect(() => {
    let ignore = false

    index(token.data).then(result => {
      if (ignore) return

      if (result.hasOwnProperty("error")) {
        //Display error
      } else {
        setAccounts(result)
      }
    })

    return () => {
      ignore = true;
    }
  }, [token])

  return <table className="min-w-full divide-y divide-gray-200">
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
  {accounts.map(account => (<AccountItem key={account.id} account={account}/>))}
  </tbody>
</table>
}

export default AccountsList;