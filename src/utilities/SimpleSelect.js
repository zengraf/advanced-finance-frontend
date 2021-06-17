import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import React, {Fragment} from "react";

const SimpleSelect = ({id, value, options, identify, display, onChange, className}) => (
  <Listbox value={value} onChange={onChange}>
    <div className={`relative ${className}`}>
      <Listbox.Button id={id} className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm cursor-default focus:outline-none sm:text-sm">
        <span className="block truncate">{display(value)}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon
            className="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options
          className="absolute z-40 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options != null ?
            options.map((option, optionIdx) => (
              <Listbox.Option
                key={identify != null ? identify(option) : optionIdx}
                className={({active}) =>
                  `${active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'}
                              cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={option}
              >
                {({active}) => (
                  <>
                    <span className={`${identify(option) === identify(value) ? 'font-medium' : 'font-normal'} block truncate`}>
                      {display(option)}
                    </span>
                    {identify(option) === identify(value)
                      ? <span
                        className={`${active ? 'text-blue-600' : 'text-blue-600'} absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                      </span>
                      : null
                    }
                  </>
                )}
              </Listbox.Option>
            ))
            : null}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
)

export default SimpleSelect