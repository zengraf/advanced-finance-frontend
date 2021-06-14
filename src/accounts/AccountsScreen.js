import React from "react";
import AccountsList from "./AccountsList";

function AccountsScreen(){
  return <div className="absolute w-full shadow overflow-y-hidden overflow-x-auto sm:rounded-xl bg-white">
    <AccountsList/>
  </div>
}
export default AccountsScreen;