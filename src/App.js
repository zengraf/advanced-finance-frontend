import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect, useHistory} from "react-router-dom"
import LoginScreen from "./authentication/LoginScreen";
import HomeScreen from "./home/HomeScreen";
import TransactionsScreen from "./transactions/TransactionsScreen";
import localStorage from "local-storage"
import jwtDecode from "jwt-decode";
import Navbar from "./navbar/Navbar";
import {LogoutIcon, CogIcon} from '@heroicons/react/solid'
import RegistrationScreen from "./authentication/RegistrationScreen";

function App() {
  const [user, setUser] = useState({})
  const [token, setToken] = useState(null)

  const history = useHistory()

  const logout = () => {
    setToken(null)
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
    [{name: "Settings", icon: CogIcon, action: function () { history.push("/settings") }}],
    [{name: "Logout", icon: LogoutIcon, action: logout}]
  ]

  useEffect(() => {
    let savedToken = localStorage.get('token')
    if (savedToken != null && jwtDecode(savedToken).exp > Math.floor(Date.now() / 1000))
      setToken(savedToken);
  }, [])
  useEffect(() => localStorage.set('token', token), [token])

  return (
    <div className="min-h-screen container xl:max-w-7xl mx-auto py-16 space-y-16 flex flex-col justify-between items-stretch">
      <Navbar navigationMenu={token != null ? navigationMenuAuthorized : navigationMenuUnauthorized} userMenu={token != null ? userMenu : null} user={user}/>
      <div className="flex-grow relative">
        <Switch>
          <Route path="/dashboard">
            {token == null && <Redirect to="/login"/>}
          </Route>
          <Route path="/transactions">
            {token == null && <Redirect to="/login"/>}
            <TransactionsScreen />
          </Route>
          <Route path="/accounts">
            {token == null && <Redirect to="/login"/>}
          </Route>
          <Route path="/register">
            {token != null && <Redirect to="/dashboard"/>}
            <RegistrationScreen onSuccess={(result) => {
              setUser(result.user)
              setToken(result.token)
            }}/>
          </Route>
          <Route path="/login">
            {token != null && <Redirect to="/dashboard"/>}
            <LoginScreen onSuccess={(result) => {
              setUser(result.user)
              setToken(result.token)
            }}/>
          </Route>
          <Route path="/">
            {token != null && <Redirect to="/dashboard"/>}
            <HomeScreen/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
