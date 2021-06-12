import LoginForm from "./LoginForm";
import React, {Fragment, useState} from "react";
import {Transition} from '@headlessui/react'
import {PlusIcon, DotsHorizontalIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";

const LoginScreen = ({onSuccess}) => {
  const [error, setError] = useState(null)

  return <div className="absolute w-full md:h-full pt-16 pb-8 md:p-0 md:flex justify-between items-stretch sm:rounded-xl bg-white shadow overflow-hidden">
    <div className="mx-12 h-full flex flex-col justify-center">
      <div className="hidden md:block h-24 mb-12">
      </div>
      <LoginForm className="md:w-80" onSubmit={(result) => {
        if (result.hasOwnProperty("error")) {
          setError(result.error)
        } else {
          setError(null)
          onSuccess(result)
        }
      }}/>
      <div className="h-24 mt-12 flex flex-col justify-center space-y-2">
        <Link className="text-lg text-blue-900 flex items-center" to="/register">
          <PlusIcon className="h-5 w-5 mr-2"/>
          Create account
        </Link>
        <Link className="text-lg text-blue-900 flex items-center" to="/iforgot">
          <DotsHorizontalIcon className="h-5 w-5 mr-2"/>
          I forgot my password
        </Link>
      </div>
      <Transition
        show={error != null}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute bottom-16 px-6 py-3 rounded-md bg-red-100 text-red-500">{error}</div>
      </Transition>
    </div>
    <div className="hidden md:block flex-auto">
      <img src="/images/login-splash.jpg" className="w-full h-full object-cover"/>
    </div>
  </div>;
}

export default LoginScreen