import {apiUrl} from "../constants";

export const endpoint = "/accounts"

export const index = async (token) => {
  const response = await fetch(apiUrl + endpoint, {
    headers: { 'Authorization': token }
  })

  const body = await response.json()

  if (response.ok) return body
  else return {error: body.error || body.errors || "Unknown error"}
}

export const summary = async (token, currencyId) => {
  const response = await fetch(currencyId != null
    ? `${apiUrl}${endpoint}/summary?currency_id=${currencyId}`
    : `${apiUrl}${endpoint}/summary`, {
    headers: { 'Authorization': token }
  })

  const body = await response.json()

  if (response.ok) return body
  else return {error: body.error || body.errors || "Unknown error"}
}