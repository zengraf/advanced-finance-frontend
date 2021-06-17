import React, {useState} from "react";
import {PlusIcon, XIcon} from "@heroicons/react/solid";
import AddCurrencyDialog from "./AddCurrencyDialog";
import CurrencyFlag from "./CurrencyFlag";
import {destroy, post} from "./CurrenciesAPI";
import {useToken} from "../authentication/TokenHook";
import {useUser, setUser} from "../settings/UserHook";
import {useRouteMatch, useHistory} from "react-router-dom";
import CurrencyRatesList from "./CurrencyRatesList";

const CurrenciesScreen = () => {
  const match = useRouteMatch('/currencies/:id')
  const history = useHistory()
  const [showNew, setShowNew] = useState(false)

  const user = useUser()
  const token = useToken()

  const selectedCurrency = user.data && match && user.data.currencies.find(currency => currency.id === parseInt(match.params.id))

  return <div className="w-full grid sm:grid-cols-5 md:grid-cols-3 gap-12">
    <div className="sm:col-span-2 md:col-span-1">
      <div className="shadow overflow-hidden sm:rounded-xl bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/4 text-left text-xs font-medium text-gray-500 uppercase">
              Currencies
            </th>
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
          {user.data &&
          user.data.currencies.map(currency => (
            <tr
              key={`currency-${currency.id}`}
              className={`cursor-pointer ${selectedCurrency && selectedCurrency.id === currency.id ? "bg-blue-100" : "hover:bg-blue-50"}`}
              onClick={() => history.push(`/currencies/${currency.id}`)}
            >
              <th scope="row" className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">
                <CurrencyFlag code={currency.code} className="-mb-0.5 mr-4"/>
                {currency.code}
              </th>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 flex justify-end items-center">
                <button
                  className={`p-2 focus:outline-none rounded-full ${selectedCurrency && selectedCurrency.id === currency.id ? "hover:bg-blue-200" : "hover:bg-blue-100"}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (selectedCurrency && selectedCurrency.id === currency.id) {
                      history.push("/currencies")
                    }
                    destroy(token.data, currency).then(result => {
                      if (result) {
                        setUser(oldUser => ({
                          data: oldUser.data && {
                            ...oldUser.data,
                            currencies: oldUser.data.currencies.filter(c => c.id !== currency.id)
                          }
                        }))
                      }
                    })
                  }}
                >
                  <XIcon className="h-4 w-4"/>
                </button>
              </td>
            </tr>
          ))
          }
          </tbody>
        </table>
        {user.data && user.data.currencies.length === 0 &&
        <div className="h-12 w-full flex items-center bg-gray-50">
          <p className="px-6 text-gray-500 text-sm">No currencies added yet</p>
        </div>
        }
      </div>
      <AddCurrencyDialog
        isOpen={showNew}
        onClose={() => setShowNew(false)}
        onSelect={currency => {
          post(token.data, currency).then(result => {
            if (result.hasOwnProperty("error")) {
              // TODO: Display error
            } else {
              setUser({data: user.data && {...user.data, currencies: result}})
              setShowNew(false)
            }
          })
        }}
      />
    </div>
    <div className="sm:col-span-3 md:col-span-2">
      <div className="shadow overflow-hidden sm:rounded-xl bg-white">
        <CurrencyRatesList currency={selectedCurrency}/>
      </div>
    </div>
  </div>
}

export default CurrenciesScreen