import React, {useEffect, useState} from "react";
import RandomCurrencyLoader from "../utilities/RandomCurrencyLoader";
import {dataInit} from "../utilities/DataUtils";
import {show} from "./CurrenciesAPI";
import {useToken} from "../authentication/TokenHook";
import {useUser} from "../settings/UserHook";

const CurrencyRatesList = ({currency}) => {
  const [currencyDetails, setCurrencyDetails] = useState(currency ? dataInit : {})

  const token = useToken()
  const user = useUser()

  useEffect(() => {
    let ignore = false

    if (token.data != null && currency != null) {
      show(token.data, currency).then(result => {
        if (ignore) return

        if (result.hasOwnProperty("error")) {
          setCurrencyDetails({error: result.error})
        } else {
          setCurrencyDetails({data: result})
        }
      })
    }

    return () => {
      ignore = true;
    }
  }, [currency, token])

  useEffect(() => {
    setCurrencyDetails(currency ? dataInit : {})
  }, [currency])

  const sellingRates = currencyDetails.data && currencyDetails.data.selling_rates
  const purchaseRates = currencyDetails.data && currencyDetails.data.purchase_rates

  const rates = currency && currencyDetails.data && user.data && user.data.currencies
    .filter(c => c.id !== currency.id)
    .map(c => ({
      currency: c,
      sell: sellingRates.find(rate => rate.to.id === c.id),
      purchase: purchaseRates.find(rate => rate.from.id === c.id)
    }))

  return <>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          Currency
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          Sell
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          Purchase
        </th>
      </tr>
      </thead>
      <tbody>
      {rates &&
      rates.map(rate => <tr key={`rate-${rate.currency.code}`}>
        <th scope="row" className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">
          {rate.currency.code}
        </th>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{rate.sell ? rate.sell.rate.toFixed(4) : '–'}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{rate.purchase ? rate.purchase.rate.toFixed(4) : '–'}</div>
        </td>
      </tr>)
      }
      </tbody>
    </table>
    {currency == null &&
    <div className="h-12 w-full flex items-center text-sm bg-gray-50 text-gray-600">
      <p className="px-6">Select a currency from the list to see the rates</p>
    </div>
    }
    {currencyDetails.loading &&
    <div className="h-12 w-full flex justify-center items-center">
      <RandomCurrencyLoader className="w-8 h-8 text-gray-700 fill-current"/>
    </div>
    }
    {currencyDetails.error &&
    <div className="h-16 w-full flex items-center text-sm bg-gray-100 text-gray-600">
      <p>{currencyDetails.error}</p>
    </div>
    }
  </>
}

export default CurrencyRatesList