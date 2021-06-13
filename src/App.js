import React, {useState} from 'react';
import {Switch, Route, Redirect, useHistory} from "react-router-dom"
import LoginScreen from "./authentication/LoginScreen";
import HomeScreen from "./home/HomeScreen";
import TransactionsScreen from "./transactions/TransactionsScreen";
import localStorage from "local-storage"
import Navbar from "./navbar/Navbar";
import {LogoutIcon, CogIcon, CurrencyDollarIcon} from '@heroicons/react/solid'
import RegistrationScreen from "./authentication/RegistrationScreen";
import {useToken, setToken} from "./authentication/TokenHook";
import RandomCurrencyLoader from "./utilities/RandomCurrencyLoader";

function App() {
  const [user, setUser] = useState({})

  const token = useToken()
  const history = useHistory()

  const logout = () => {
    setToken({loading: false, data: null})
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
    [{
      name: "Settings", icon: CogIcon, action: function () {
        history.push("/settings")
      }
    }],
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
              <Route path="/accounts">
                {token.data == null && <Redirect to="/login?redirect_to=/accounts"/>}
              </Route>
              <Route path="/register">
                {token.data != null && <Redirect to="/dashboard"/>}
                <RegistrationScreen/>
              </Route>
              <Route path="/login">
                {token.data != null && <Redirect to="/dashboard"/>}
                <LoginScreen onSuccess={(result) => {
                  setUser(result.user)
                  setToken({data: result.token})
                }}/>
              </Route>
              <Route path="/">
                {token.data != null && <Redirect to="/dashboard"/>}
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
