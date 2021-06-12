import React, {Fragment, useState} from "react";
import {Transition} from "@headlessui/react";
import RegistrationForm from "./RegistrationForm";
import {Link} from "react-router-dom";
import {ArrowNarrowLeftIcon} from "@heroicons/react/solid"

const RegistrationScreen = ({onSuccess}) => {
  const [error, setError] = useState(null)

  return <div className="absolute w-full md:h-full py-8 md:p-0 md:flex justify-between items-stretch sm:rounded-xl bg-white shadow overflow-hidden">
    <div className="mx-12 h-full flex flex-col justify-center">
      <Link className="mb-8 py-2 text-lg text-blue-900 flex items-center" to="/login">
        <ArrowNarrowLeftIcon className="h-5 w-5 mr-2"/>
        I already have an account
      </Link>
      <RegistrationForm className="md:w-80" onSubmit={(result) => {
        if (result.hasOwnProperty("error")) {
          setError(result.error)
        } else {
          setError(null)
          onSuccess(result)
        }
      }}/>
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
      <img src="/images/register-splash.jpg" className="w-full h-full object-cover"/>
    </div>
  </div>;
}

export default RegistrationScreen