import React, {useEffect, useState} from "react";
import AccountsList from "./AccountsList";
import {summary} from "./AccountsAPI";
import {useToken} from "../authentication/TokenHook";
import {useUser} from "../settings/UserHook";

const summaryHeaders = [
  {name: "Currency", key: 'currency.code'},
  {name: "Total", key: 'total'},
]

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
    <div className="col-span-2 shadow overflow-y-hidden overflow-x-auto sm:rounded-xl bg-white">
      <AccountsList/>
    </div>
    <div>
      <div className="shadow overflow-y-hidden overflow-x-auto sm:rounded-xl bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            {summaryHeaders.map(header =>
              <th
                key={header.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {header.name}</th>
            )}
          </tr>
          </thead>
          <tbody>
          {summaryData &&
            summaryData.totals.map(total => (
              <tr key={`currency-${total.currency.id}`}>
                <th scope="row"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider"
                >
                  {total.currency.code}
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{total.value}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  </div>
}
export default AccountsScreen;