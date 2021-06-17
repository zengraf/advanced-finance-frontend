import React, {Fragment} from "react";
import {Transition, Dialog} from "@headlessui/react";

const SimpleDialog = ({isOpen, onClose, className, title, submitTitle = "Save", onSubmit, children}) => {
  return <Transition show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-30 overflow-y-auto"
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
          <Dialog.Overlay className="fixed -z-10 inset-0 bg-gray-500 bg-opacity-50"/>
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
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
          <div className={`inline-block z-30 w-full p-8 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl ${className}`}>
            <Dialog.Title as="h3" className="mb-6 text-lg font-medium leading-6 text-gray-900">
              {title}
            </Dialog.Title>

            {children}

            <div className="mt-8 space-x-2">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-500 text-white border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={onSubmit}
              >
                {submitTitle}
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-700 border border-transparent rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
}

export default SimpleDialog