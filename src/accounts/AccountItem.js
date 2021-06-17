import React from 'react'
import {PencilIcon} from "@heroicons/react/solid";

export default function AccountItem({account, onEdit}) {

  return <tr key={account.id}>
    <th scope="row"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{account.id}</th>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{account.name}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{account.amount.toFixed(2)}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{account.currency.code}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap cursor-pointer text-sm font-normal text-blue-600 hover:text-blue-900 focus:outline-none flex justify-end items-center" onClick={onEdit}>
      <PencilIcon className="h-4 w-4 mr-1 inline-block fill-current"/> Edit
    </td>
  </tr>
}