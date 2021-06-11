import LoginForm from "./LoginForm";
import React, {useState} from "react";

const LoginScreen = ({onSuccess}) => {
  const [error, setError] = useState(null)

  return <div className="absolute w-full h-full flex justify-between items-stretch rounded-xl border border-gray-200 bg-white shadow overflow-hidden">
    <div className="mx-16 h-full flex flex-col justify-center">
      {error &&
      <div className="absolute bottom-16 px-6 py-3 rounded-md bg-red-100 text-red-600">{error}</div>
      }
      <LoginForm className="w-80" onSubmit={(result) => {
        if (result.hasOwnProperty("error")) {
          setError(result.error)
        } else {
          setError(null)
          onSuccess(result)
        }
      }}/>
    </div>
    <div className="flex-auto">
      <img src="/images/login-splash.jpg" className="w-full h-full object-cover"/>
    </div>
  </div>;
}

export default LoginScreen