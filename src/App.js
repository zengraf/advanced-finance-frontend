import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import {LockClosedIcon} from "@heroicons/react/solid";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({ email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if(details.email === adminUser.email && details.password === adminUser.password){
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email
      })
    } else {
      console.log("Details do not match!");
      setError("Details do not match!");
    }
  }

  const Logout = () => {
    setUser({ name: "", email: ""});
  }

  return (
    <div className="endless-clouds  fill-current min-h-screen min-w-screen flex flex-col items-center justify-evenly">
      <h1 className="font-display text-6xl">Finance Manager</h1>
      <LoginForm className="w-80" />
      <div className="h-12">

      </div>
    </div>
  );
}

export default App;
