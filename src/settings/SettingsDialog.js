import React, {useState} from "react";
import DefaultAvatar from "../utilities/DefaultAvatar";
import {update} from "./UserAPI";
import {useToken} from "../authentication/TokenHook";
import SimpleDialog from "../utilities/SimpleDialog";
import {useUser} from "./UserHook";

const SettingsDialog = ({isOpen, onClose, onSave}) => {
  const user = useUser()
  const token = useToken()

  const [username, setUsername] = useState(user.data != null ? user.data.username : '')
  const [newAvatar, setNewAvatar] = useState(null)

  return <SimpleDialog
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={async () => {
      const result = await update(token.data, {
        username: username,
        avatar: newAvatar
      })
      if (result.hasOwnProperty("error")) {
        // TODO: Display error
      } else {
        onSave(result)
      }
    }}
    title="Settings"
    className="max-w-md"
  >
    <div className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="nickname"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          placeholder="Username"
        />
      </div>
      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Photo</label>
        <div className="mt-2 flex items-center">
          {newAvatar != null
            ? <img src={URL.createObjectURL(newAvatar)} className="h-12 w-12 object-cover rounded-full" alt="New avatar"/>
            : user.data != null && user.data.avatar_url != null
              ? <img src={user.data.avatar_url} className="h-12 w-12 object-cover rounded-full" alt="Current avatar"/>
              : <DefaultAvatar className="h-12 w-12 flex-1 text-gray-300"/>
          }
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={e => setNewAvatar(e.target.files && e.target.files[0])}
            className="ml-5 flex-grow bg-white py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  </SimpleDialog>
}

export default SettingsDialog

