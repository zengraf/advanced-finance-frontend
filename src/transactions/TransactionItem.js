import React, {useState} from 'react'



function TransactionItem({transaction}) {
    
    return<tr key={transaction.id}>
            <th scope="row" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{transaction.id}</th>               
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{transaction.date}</div>
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
    </tr>

  }
  
  export default TransactionItem;