import React, {createElement, useEffect, useState} from "react"
import {Link, useLocation} from "react-router-dom"
import {confirm} from "./AuthenticationAPI"
import {ReactComponent as Email} from "../icons/email.svg";
import {ReactComponent as EmailSuccess} from "../icons/email-success.svg";
import {ReactComponent as EmailWarning} from "../icons/email-warning.svg";
import {ArrowNarrowRightIcon} from "@heroicons/react/solid";

const ConfirmationScreen = () => {
  const confirmationToken = new URLSearchParams(useLocation().search).get("confirmation_token")

  const [error, setError] = useState(null)
  const [email, setEmail] = useState(null)

  useEffect(() => {
    if (confirmationToken != null) {
      confirm(confirmationToken).then(result => {
        if (result.hasOwnProperty("error")) {
          setError(result.error)
        } else {
          setEmail(result.email)
        }
      })
    }
  }, [])

  return <div
    className="w-full md:h-full p-16 pb-8 md:p-0 flex flex-col justify-center items-center space-y-16 md:space-y-32 sm:rounded-xl bg-white shadow overflow-hidden">
    {createElement(email == null ? (error == null ? Email : EmailWarning) : EmailSuccess, {className: "w-24 h-24"})}
    <p className="text-lg text-center">
      {email == null
        ? error == null
          ? "We've sent you an e-mail with a confirmation link just to check whether it's really your email"
          : <>An error occurred: <span className="font-mono">{JSON.stringify(error)}</span></>
        : <>Thanks, now we believe <span className="font-semibold">{email}</span> is your email. You can now <Link to={`/login?email=${email}`} className="text-blue-500 hover:text-blue-700">log into your account <ArrowNarrowRightIcon className="mb-0.5 h-5 w-5 inline-block"/></Link></>
      }
    </p>
  </div>
}

export default ConfirmationScreen