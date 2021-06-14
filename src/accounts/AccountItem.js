import React from 'react'

export default function AccountItem({account}) {

  return <tr key={account.id}>
    <th scope="row"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{account.id}</th>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{account.name}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{account.amount}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{account.currency.code}</div>
    </td>
  </tr>
}