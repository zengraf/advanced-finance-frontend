import React, {useState} from "react";
import {useUser} from "../settings/UserHook";
import {PlusIcon} from "@heroicons/react/solid";

const CurrenciesScreen = () => {
  const [showNew, setShowNew] = useState(false)

  const user = useUser()

  return <div className="w-full grid md:grid-cols-2 lg:grid-cols-11 gap-12">
    <div className="lg:col-span-3">
      <div className="shadow overflow-hidden sm:rounded-xl bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 w-1/4 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Currencies
            </th>
            <th
              scope="col"
              onClick={() => setShowNew(true)}
              className="relative flex items-center justify-end px-6 py-3 cursor-pointer text-right text-sm font-medium text-blue-600 hover:text-blue-900"
            >
              <PlusIcon className="h-5 w-5 inline-block fill-current"/> Add
            </th>
          </tr>
          </thead>
          <tbody>
          {user.data &&
          user.data.currencies.map(currency => (
            <tr key={`currency-${currency.id}`}>
              <th scope="row"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider"
              >
                {currency.code}
              </th>
            </tr>
          ))
          }
          </tbody>
        </table>
        {user.data && user.data.currencies.length === 0 &&
        <div className="h-12 w-full flex justify-center items-center bg-gray-50">
          <p className="text-gray-500 text-sm">No currencies added yet</p>
        </div>
        }
      </div>
    </div>
  </div>
}

export default CurrenciesScreen