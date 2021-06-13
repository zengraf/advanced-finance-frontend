import React, {useState, useEffect, useCallback} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import LoginScreen from "./login/LoginScreen";
import HomeScreen from "./home/HomeScreen";
import TransactionsScreen from "./transactions/TransactionsScreen";
import localStorage from "local-storage"
import jwtDecode from "jwt-decode";

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    let savedToken = localStorage.get('token')
    if (savedToken != null && jwtDecode(savedToken).exp > Math.floor(Date.now() / 1000))
      setToken(savedToken);
  }, [])
  useEffect(() => localStorage.set('token', token), [token])

  return (
    <BrowserRouter>
      <div className="min-h-screen container xl:max-w-7xl mx-auto py-16 space-y-16 flex flex-col justify-between items-stretch">
        <div className="h-24 px-8 flex justify-between items-center">
          <h1 className="font-display text-5xl">
            <span>Finance Manager | </span>
            <Switch>
              <Route path="/dashboard">Dashboard</Route>
              <Route path="/login">Login</Route>
              <Route path="/register">Register</Route>
              <Route path="/transactions">Transactions</Route>
              <Route path="/">Home</Route>
            </Switch>
          </h1>
          <button onClick={() => setToken(null)}>Logout</button>
          <img src="/images/avatar-default.jpg" className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex-grow relative">
          <Switch>
            <Route path="/dashboard">
              {token == null && <Redirect to="/login"/>}
            </Route>
            <Route path="/login">
              {token != null && <Redirect to="/dashboard"/>}
              <LoginScreen onSuccess={(result) => {
                setUser(result.user)
                setToken(result.token)
              }}/>
            </Route>
            <Route path="/transactions">
              {token != null && <Redirect to="/transactions"/>}
              <TransactionsScreen />
            </Route>
            <Route path="/">
              {token != null && <Redirect to="/dashboard"/>}
              <HomeScreen/>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
