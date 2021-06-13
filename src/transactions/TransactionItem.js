import React from 'react'
import intlFormat from 'date-fns/intlFormat'

export default function TransactionItem({transaction}) {

  return <tr key={transaction.id}>
    <th scope="row"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{transaction.id}</th>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{
        intlFormat(Date.parse(transaction.date), {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{transaction.account.name}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{transaction.area.name}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{transaction.category.name}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{transaction.amount}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{transaction.account.currency.code}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{transaction.description}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Edit
      </button>
    </td>
  </tr>

}