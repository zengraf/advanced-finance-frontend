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

export const post = async (token, data) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const body = await response.json()

  if (response.ok) return body
  else return {
    error: body.error || body.errors
  }
}

export const patch = async (token, id, data) => {
  const response = await fetch(`${apiUrl}${endpoint}/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const body = await response.json()

  if (response.ok) return body
  else return {
    error: body.error || body.errors
  }
}