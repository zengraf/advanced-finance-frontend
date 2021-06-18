import React, {useEffect, useState} from "react";
import SimpleDialog from "../utilities/SimpleDialog";
import {patchCategories, postCategories} from "./AnalyticsAPI";
import {useToken} from "../authentication/TokenHook";

const CategoryDialog = ({isOpen, onClose, onSave, category}) => {
  const [name, setName] = useState()
  const [limit, setlimit] = useState()

  const token = useToken()

  useEffect(() => {
    if (category == null) {
      setName("")
      setlimit("")
    } else {
      setName(category.name)
      setlimit(category.limit)
    }

  }, [category])

  return <SimpleDialog
    title={category != null ? `Edit Category №${category.id}` : "New Category"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={async () => {
      const result = category != null
        ? await patchCategories(token.data, category.id, {
            category: {
            name: name,
            limit: limit
          }
        })
        : await postCategories(token.data, {
            category: {
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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

export default CategoryDialog