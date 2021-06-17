import {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {singletonHook} from "react-singleton-hook";

let globalSetToken = () => { throw new Error('you must useToken before setting its state'); };

const init = {loading: true}

const useTokenImpl = () => {
  const [token, setToken] = useState(init)

  useEffect(() => {
    let savedToken = localStorage.getItem('token')
    if (savedToken != null && jwtDecode(savedToken).exp > Math.floor(Date.now() / 1000))
      setToken({data: savedToken})
    else {
      setToken({})
      localStorage.clear()
    }
  }, [])
  useEffect(() => {
    if (token.data != null)
      localStorage.setItem('token', token.data)
  }, [token])

  globalSetToken = setToken

  return token
}

export const useToken = singletonHook(init, useTokenImpl)
export const setToken = token => globalSetToken(token)