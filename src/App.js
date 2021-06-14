import React, {useEffect, useState} from 'react';
import {Switch, Route, Redirect} from "react-router-dom"
import LoginScreen from "./authentication/LoginScreen";
import HomeScreen from "./home/HomeScreen";
import TransactionsScreen from "./transactions/TransactionsScreen";
import AccountsScreen from "./accounts/AccountsScreen";
import Navbar from "./navbar/Navbar";
import {LogoutIcon, CogIcon} from '@heroicons/react/solid'
import RegistrationScreen from "./authentication/RegistrationScreen";
import {useToken, setToken} from "./authentication/TokenHook";
import RandomCurrencyLoader from "./utilities/RandomCurrencyLoader";
import SettingsDialog from "./settings/SettingsDialog";
import {show} from "./settings/UserAPI";

function App() {
  const [user, setUser] = useState({})
  const [showSettings, setShowSettings] = useState(false)

  const token = useToken()

  useEffect(() => setUser(JSON.parse(localStorage.getItem('user'))), [])

  useEffect(() => {
    let ignore = false

    if (token.data != null) {
      show(token.data).then(result => {
        if (ignore) return

        if (result.hasOwnProperty("error")) {

        } else {
          setUser(result)
        }
      })
    }
    return () => {
      ignore = true
    }
  }, [token])

  useEffect(() => {
    if (user != null && user.username != null)
      localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const logout = () => {
    setToken({})
    localStorage.clear()
  }

  const navigationMenuUnauthorized = [
    {name: "Login", path: "/login", display: true},
    {name: "Register", path: "/register", display: true},
    {name: "Reset password", path: "/iforgot", display: false},
    {name: "Home", path: "/", display: true}
  ]

  const navigationMenuAuthorized = [
    {name: "Dashboard", path: "/dashboard", display: true},
    {name: "Transactions", path: "/transactions", display: true},
    {name: "Accounts", path: "/accounts", display: true},
    {name: "Currencies", path: "/currencies", display: true}
  ]

  const userMenu = [
    [{name: "Settings", icon: CogIcon, action: () => setShowSettings(true)}],
    [{name: "Logout", icon: LogoutIcon, action: logout}]
  ]

  return (
    <div
      className="min-h-screen container xl:max-w-7xl mx-auto py-16 space-y-16 flex flex-col justify-between items-stretch">
      {token.loading
        ? <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center">
          <RandomCurrencyLoader className="w-16 h-16 fill-current text-gray-700"/>
        </div>
        : <>
          <SettingsDialog
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            onSave={(newUser) => {
              setShowSettings(false)
              setUser(newUser)
            }}
            user={user}
          />
          <Navbar navigationMenu={token.data != null ? navigationMenuAuthorized : navigationMenuUnauthorized}
                  userMenu={token.data != null ? userMenu : null} user={user}/>
          <div className="flex-grow relative">
            <Switch>
              <Route path="/dashboard">
                {token.data == null && <Redirect to="/login?redirect_to=/dashboard"/>}
              </Route>
              <Route path="/transactions">
                {token.data == null && <Redirect to="/login?redirect_to=/transactions"/>}
                <TransactionsScreen/>
              </Route>
              <Route path="/currencies">
                {token.data == null && <Redirect to="/login?redirect_to=/currencies"/>}
              </Route>
              <Route path="/accounts">
                {token.data == null && <Redirect to="/login?redirect_to=/accounts"/>}
                <AccountsScreen/>
              </Route>
              <Route path="/register">
                {token.data != null && <Redirect to="/transactions"/>}
                <RegistrationScreen/>
              </Route>
              <Route path="/login">
                {token.data != null && <Redirect to="/transactions"/>}
                <LoginScreen onSuccess={(result) => {
                  setUser(result.user)
                  setToken({data: result.token})
                }}/>
              </Route>
              <Route path="/">
                {token.data != null && <Redirect to="/transactions"/>}
                <HomeScreen/>
              </Route>
            </Switch>
          </div>
        </>
      }
    </div>
  );
}

export default App;
