import {Transition, Dialog} from "@headlessui/react";
import React, {Fragment, useState} from "react";
import DefaultAvatar from "../utilities/DefaultAvatar";
import {update} from "./UserAPI";
import {useToken} from "../authentication/TokenHook";

const SettingsDialog = ({isOpen, onClose, user, onSave}) => {
  const [username, setUsername] = useState(user != null ? user.username : '')
  const [newAvatar, setNewAvatar] = useState(null)
  const token = useToken()

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
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50"/>
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="inline-block h-screen align-middle"
          aria-hidden="true"
        >
              &#8203;
            </span>
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
            className="inline-block w-full max-w-md p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Settings
            </Dialog.Title>

            <div className="mt-8 space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="nickname"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Photo</label>
                <div className="mt-2 flex items-center">
                  {newAvatar != null
                    ? <img src={URL.createObjectURL(newAvatar)} className="h-12 w-12 object-cover rounded-full" alt="New avatar"/>
                    : <DefaultAvatar className="h-12 w-12 text-gray-300"/>
                  }
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={e => setNewAvatar(e.target.files && e.target.files[0])}
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 space-x-2">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-500 text-white border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={async () => {
                  const result = await update(token.data, {
                    username: username,
                    avatar: newAvatar
                  })
                  if (result.hasOwnProperty("error")) {
                    // TODO: Display error
                  } else {
                    onSave(result)
                  }
                }}
              >
                Save
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-700 border border-transparent rounded-md hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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

export default SettingsDialog

