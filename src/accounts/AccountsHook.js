import {useEffect, useState} from "react";
import {singletonHook} from "react-singleton-hook";
import {index} from "./AccountsAPI";
import {useToken} from "../authentication/TokenHook";
import {dataEffect, dataInit} from "../utilities/DataUtils";

let globalSetAccounts = () => { throw new Error('you must useAccounts before setting its state'); };

const useAccountsImpl = () => {
  const [accounts, setAccounts] = useState(dataInit)
  const token = useToken()

  useEffect(() => dataEffect(token, index, setAccounts), [token])

  globalSetAccounts = setAccounts

  return accounts
}

export const useAccounts = singletonHook(dataInit, useAccountsImpl)
export const setAccounts = accounts => globalSetAccounts(accounts)