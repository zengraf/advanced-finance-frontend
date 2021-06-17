import {apiUrl} from "../constants";

export const areasEndpoint = "/areas"
export const categoriesEndpoint = "/categories"

export const indexAreas = async (token) => {
  const response = await fetch(apiUrl + areasEndpoint, {
    headers: {
      'Authorization': token,
    }
  })
  const body = await response.json()

  if (response.ok) return body
  else return {error: body.error || body.errors || "Unknown error"}
}

export const indexCategories = async (token) => {
  const response = await fetch(apiUrl + categoriesEndpoint, {
    headers: {
      'Authorization': token,
    }
  })
  const body = await response.json()

  if (response.ok) return body
  else return {error: body.error || body.errors || "Unknown error"}
}