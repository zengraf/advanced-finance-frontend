import React, {useEffect, useState} from "react";
import {index} from "../transactions/TransactionAPI";
import {useToken} from "../authentication/TokenHook";

const AccountsList = () => {
  const [accounts, setAccounts] = useState([])
  const token = useToken()

  useEffect(() => {
    let ignore = false

    index(token.data).then(result => {
      if (ignore) return

      if (result.hasOwnProperty("error")) {
        //Display error
      } else {
        setAccounts(result)
      }
    })

    return () => {
      ignore = true;
    }
  }, [token])

  return <div className="divide-y divide-gray-300">

  </div>;
}