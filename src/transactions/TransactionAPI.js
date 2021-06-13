import {apiUrl} from "../constants"

export const endpoint = "/transactions"

export const index = async (token, page = 1, sortBy, direction) => {
  const response = await fetch(`${apiUrl}${endpoint}?page=${page}&sort_by=${sortBy}&direction=${direction}`, {
    headers: {
      "Authorization": token
    }
  })

  if (response.ok) return {
    items: await response.json(),
    pages: parseInt(response.headers.get("Total-Pages"))
  }
  else return {
    error: await response.text()
  }
}