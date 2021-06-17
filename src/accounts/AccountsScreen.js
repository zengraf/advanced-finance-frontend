import React, {useEffect, useState} from "react";
import AccountsList from "./AccountsList";
import {summary} from "./AccountsAPI";
import {useToken} from "../authentication/TokenHook";
import {useUser} from "../settings/UserHook";
import SimpleSelect from "../utilities/SimpleSelect";

const AccountsScreen = () => {
  const token = useToken()
  const user = useUser()

  const [grandTotalCurrency, setGrandTotalCurrency] = useState(user.data && user.data.currencies[0])
  const [summaryData, setSummaryData] = useState(null)

  useEffect(() => {
    let ignore = false

    summary(token.data, grandTotalCurrency != null ? grandTotalCurrency.id : null).then(result => {
      if (ignore) return

      if (result.hasOwnProperty("error")) {
        // TODO: Display error
      } else {
        setSummaryData(result)
        if (grandTotalCurrency == null)
          setGrandTotalCurrency(result.grand_total.currency)
      }
    })

    return () => {
      ignore = true
    }
  }, [grandTotalCurrency, token])

  return <div className="w-full grid grid-cols-3 gap-12">
    <div className="col-span-2">
      <div className="shadow overflow-y-hidden overflow-x-auto sm:rounded-xl bg-white">
        <AccountsList/>
      </div>
    </div>
    <div>
      <div className="shadow overflow-y-hidden overflow-x-auto sm:rounded-xl bg-white">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/4 text-left text-xs font-medium text-gray-500 uppercase">
              Currency
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Total
            </th>
          </tr>
          </thead>
          <tbody>
          {summaryData &&
            summaryData.totals.map(total => (
              <tr key={`currency-${total.currency.id}`}>
                <th scope="row" className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">
                  {total.currency.code}
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{total.value.toFixed(2)}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
      <div className="mt-12 px-6 py-4 shadow sm:rounded-xl bg-white">
        <h3 className="text-left text-xs font-medium text-gray-500 uppercase">Grand total</h3>
        <div className="mt-3 flex items-center space-x-5">
          <SimpleSelect
            value={grandTotalCurrency}
            onChange={setGrandTotalCurrency}
            options={user.data && user.data.currencies}
            display={currency => <span className="text-sm font-medium text-gray-800 uppercase tracking-wider">{currency.code}</span>}
            identify={currency => currency.number}
            className="w-24"
          />
          <span className="text-sm text-gray-900">{summaryData && summaryData.grand_total.value.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
}
export default AccountsScreen;