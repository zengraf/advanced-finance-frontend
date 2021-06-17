import React, {useEffect, useState} from "react";
import SimpleDialog from "../utilities/SimpleDialog";
import {patch, post} from "./AccountsAPI";
import {useToken} from "../authentication/TokenHook";
import SimpleSelect from "../utilities/SimpleSelect";
import {useUser} from "../settings/UserHook";

const TransactionDialog = ({isOpen, onClose, onSave, account}) => {
  const [name, setName] = useState()
  const [amount, setAmount] = useState()
  const [currency, setCurrency] = useState()

  const token = useToken()
  const user = useUser()

  useEffect(() => {
    if (account == null) {
      setName("")
      setAmount("")
      setCurrency(user.data && user.data.currencies[0])
    } else {
      setName(account.name)
      setAmount(account.amount)
      setCurrency(account.currency)
    }

  }, [account, user])

  return <SimpleDialog
    title={account != null ? `Edit account №${account.id}` : "New account"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={async () => {
      const result = account != null
        ? await patch(token.data, account.id, {
           account: {
            name: name,
            amount: amount,
            currency_id: currency.id
          }
        })
        : await post(token.data, {
          account: {
            name: name,
            amount: amount,
            currency_id: currency.id
          }
        })

      if (result.hasOwnProperty("error")) {
        // TODO: Display error
      } else {
        onSave(result)
      }
    }}
    className="max-w-lg"
  >
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="w-32">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={amount}
            onChange={event => setAmount(event.target.value)}
            className="mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex-grow">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Account
          </label>
          <input
            id="name"
            name="account"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      {account == null &&
        <div className="flex space-x-4">
            <div className="flex-1">
                <label htmlFor="account" className="block text-sm font-medium text-gray-700">
                    Currency
                </label>
                <SimpleSelect
                    value={currency}
                    onChange={setCurrency}
                    options={user.data && user.data.currencies}
                    display={currency => <span className="text-sm font-medium text-gray-800 uppercase tracking-wider">{currency.code}</span>}
                    identify={currency => currency.number}
                    className="mt-2"
                />
            </div>
        </div>
      }
      
    </div>
  </SimpleDialog>
}

export default TransactionDialog