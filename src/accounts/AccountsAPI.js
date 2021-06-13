import {apiUrl} from "../constants";

export const endpoint = "/accounts"

export const index = async (token) => {
  const response = await fetch(apiUrl + endpoint, {
    headers: {
      'Authentication': token,
    }
  })
  const body = await response.json()

  if (response.ok) return body
  else return {error: body.error}
}