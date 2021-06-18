import React from 'react'
import {PencilIcon} from "@heroicons/react/solid";

export default function AccountItem({category, spent, onEdit}) {

    return <tr key={`category-${category.id}`}>
        <th scope="row" className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
        {category.name}
        </th>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{spent ? spent.toFixed(2) : "-"}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.limit ? category.limit.toFixed(2) : "-"}</td>
        <td className="px-6 py-4 whitespace-nowrap cursor-pointer text-sm font-normal text-blue-600 hover:text-blue-900 focus:outline-none flex justify-end items-center" onClick={onEdit}>
            <PencilIcon className="h-4 w-4 mr-1 inline-block fill-current"/> Edit
        </td>
    </tr>
}