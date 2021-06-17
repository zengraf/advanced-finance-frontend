import React, {Fragment, useEffect, useState} from "react";
import {useUser} from "../settings/UserHook";
import {Dialog, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/solid";
import {dataEffect, dataInit} from "../utilities/DataUtils";
import {useToken} from "../authentication/TokenHook";
import {index} from "./CurrenciesAPI";
import RandomCurrencyLoader from "../utilities/RandomCurrencyLoader";
import CurrencyFlag from "./CurrencyFlag";

const AddCurrencyDialog = ({isOpen, onClose, onSelect}) => {
  const user = useUser()
  const token = useToken()

  const [currencies, setCurrencies] = useState(dataInit)

  useEffect(() => dataEffect(token, index, setCurrencies), [token])

  const addedCurrencyIdx = user.data && user.data.currencies.map(c => c.id)
  const availableCurrencies = currencies.data && currencies.data.filter(currency => addedCurrencyIdx && !addedCurrencyIdx.includes(currency.id))

  return <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={onClose}
    >
      <div className="min-h-screen px-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50"/>
        </Transition.Child>
        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="inline-block w-full max-w-xs p-4 my-8 space-y-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="flex items-center justify-between">
              <Dialog.Title as="h3" className="ml-2 text-lg font-medium leading-6 text-gray-900">
                Add a currency
              </Dialog.Title>
              <button
                type="button"
                className="justify-center p-2 text-sm font-medium text-gray-700 border border-transparent rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={onClose}
              >
                <XIcon className="w-5 h-5 fill-current"/>
              </button>
            </div>
            {(user.loading || currencies.loading)
              ? <div className="h-16 w-full flex justify-center items-center">
                <RandomCurrencyLoader className="w-8 h-8 text-gray-700 fill-current"/>
              </div>
              : <div className="max-h-80 overflow-y-auto divide divide-gray-200 divide-y">
                {user.data && currencies.data &&
                availableCurrencies.length !== 0
                  ? availableCurrencies.map(currency => (
                    <button
                      key={`currency-button-${currency.id}`}
                      className="w-full p-3 hover:bg-gray-100 flex items-center space-x-4 focus:outline-none"
                      onClick={() => onSelect(currency)}
                    >
                      <CurrencyFlag code={currency.code}/>
                      <span>{currency.code}</span>
                    </button>
                  ))
                  : <p className="py-2 text-sm text-gray-600 text-center">You have added all available currencies</p>
                }
              </div>
            }
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
}

export default AddCurrencyDialog