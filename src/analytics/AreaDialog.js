import React, {useEffect, useState} from "react";
import SimpleDialog from "../utilities/SimpleDialog";
import {patchAreas, postAreas} from "./AnalyticsAPI";
import {useToken} from "../authentication/TokenHook";

const AreaDialog = ({isOpen, onClose, onSave, area}) => {
  const [name, setName] = useState()
  const [limit, setlimit] = useState()

  const token = useToken()

  useEffect(() => {
    if (area == null) {
      setName("")
      setlimit("")
    } else {
      setName(area.name)
      setlimit(area.limit)
    }

  }, [area])

  return <SimpleDialog
    title={area != null ? `Edit Area №${area.id}` : "New Area"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={async () => {
      const result = area != null
        ? await patchAreas(token.data, area.id, {
            area: {
            name: name,
            limit: limit
          }
        })
        : await postAreas(token.data, {
            area: {
            name: name,
            limit: limit
          }
        })

      if (result.hasOwnProperty("error")) {
        // TODO: Display error
      } else {
        onSave(result)
      }
    }}
    className="max-w-lg"
  >
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="w-32">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            className="mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex-grow">
          <label htmlFor="limit" className="block text-sm font-medium text-gray-700">
            Limit
          </label>
          <input
            id="limit"
            name="limit"
            type="number"
            required
            value={limit}
            onChange={e => setlimit(e.target.value)}
            className="mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  </SimpleDialog>
}

export default AreaDialog