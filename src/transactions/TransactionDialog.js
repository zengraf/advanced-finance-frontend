import React, {useEffect, useState} from "react";
import SimpleDialog from "../utilities/SimpleDialog";
import {patch, post} from "./TransactionAPI";
import {useToken} from "../authentication/TokenHook";
import SimpleSelect from "../utilities/SimpleSelect";
import {useAccounts} from "../accounts/AccountsHook";
import {useAreas, useCategories} from "../analytics/CustomHooks";
import DatePicker from "react-datepicker"

const TransactionDialog = ({isOpen, onClose, onSave, transaction}) => {
  const [date, setDate] = useState(new Date())
  const [account, setAccount] = useState()
  const [area, setArea] = useState()
  const [category, setCategory] = useState()
  const [amount, setAmount] = useState()
  const [description, setDescription] = useState()

  const token = useToken()
  const accounts = useAccounts()
  const areas = useAreas()
  const categories = useCategories()

  useEffect(() => {
    if (transaction == null) {
      setDate(new Date())
      setAccount(accounts.data && accounts.data[0])
      setArea(areas.data && areas.data[0])
      setCategory(categories.data && categories.data[0])
      setAmount("")
      setDescription("")
    } else {
      setDate(new Date(Date.parse(transaction.date)))
      setAccount(transaction.account)
      setArea(transaction.area)
      setCategory(transaction.category)
      setAmount(transaction.amount)
      setDescription(transaction.description)
    }

  }, [accounts, areas, categories, transaction])

  return <SimpleDialog
    title={transaction != null ? `Edit transaction №${transaction.id}` : "New transaction"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={async () => {
      const result = transaction != null
        ? await patch(token.data, transaction.id, {
          transaction: {
            date: date.toISOString(),
            account_id: account.id,
            area_id: area.id,
            category_id: category.id,
            amount: amount,
            description: description
          }
        })
        : await post(token.data, {
          transaction: {
            date: date.toISOString(),
            account_id: account.id,
            area_id: area.id,
            category_id: category.id,
            amount: amount,
            description: description
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
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <DatePicker
            name="date"
            locale="en"
            selected={date}
            onChange={setDate}
            dateFormat="dd MMMM yyyy"
            todayButton="Today"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-blue-500"
            wrapperClassName="mt-2 w-full focus-within:z-40"
            required
            preventOpenOnFocus
          />
        </div>
        <div className="flex-1">
          <label htmlFor="account" className="block text-sm font-medium text-gray-700">
            Account
          </label>
          <SimpleSelect
            id="account"
            value={account}
            onChange={setAccount}
            options={accounts.data}
            identify={(account => account.id)}
            display={(account => account.name)}
            className="mt-2"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Area
          </label>
          <SimpleSelect
            id="area"
            value={area}
            onChange={setArea}
            options={areas.data}
            identify={(area => area.id)}
            display={(area => area.name)}
            className="mt-2"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <SimpleSelect
            id="category"
            value={category}
            onChange={setCategory}
            options={categories.data}
            identify={(category => category.id)}
            display={(category => category.name)}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  </SimpleDialog>
}

export default TransactionDialog