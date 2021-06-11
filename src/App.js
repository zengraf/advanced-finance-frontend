import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import LoginScreen from "./login/LoginScreen";

function App() {
  return (
    <div className="min-h-screen min-w-screen">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginScreen}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
