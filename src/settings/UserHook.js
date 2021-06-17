import {useEffect, useState} from "react";
import {dataEffect, dataInit} from "../utilities/DataUtils";
import {useToken} from "../authentication/TokenHook";
import {singletonHook} from "react-singleton-hook";
import {show} from "./UserAPI";

let globalSetUser = () => { throw new Error('you must useUser before setting its state'); };

const useUserImpl = () => {
  const [user, setUser] = useState(dataInit)
  const token = useToken()

  useEffect(() => setUser(JSON.parse(localStorage.getItem('user'))), [])
  useEffect(() => dataEffect(token, show, setUser), [token])
  useEffect(() => localStorage.setItem('user', JSON.stringify(user)), [user])

  globalSetUser = setUser

  return user
}

export const useUser = singletonHook(dataInit, useUserImpl)
export const setUser = user => globalSetUser(user)