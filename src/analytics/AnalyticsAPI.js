import {apiUrl} from "../constants";

export const areasEndpoint = "/areas"

export const indexAreas = async (token) => {
  const response = await fetch(apiUrl + areasEndpoint, {
    headers: {
      'Authorization': token,
    }
  })
  const body = await response.json()

  if (response.ok) return body.map(area => ({...area, limit: parseFloat(area.limit)}))
  else return {error: body.error || body.errors || "Unknown error"}
}

export const categoriesEndpoint = "/categories"

export const indexCategories = async (token) => {
  const response = await fetch(apiUrl + categoriesEndpoint, {
    headers: {
      'Authorization': token,
    }
  })
  const body = await response.json()

  if (response.ok) return body.map(category => ({...category, limit: parseFloat(category.limit)}))
  else return {error: body.error || body.errors || "Unknown error"}
}

const analyticsEndpoint = "/analytics"

export const index = async (token, currencyId) => {
  const response = await fetch(currencyId != null
    ? `${apiUrl}${analyticsEndpoint}?currency_id=${currencyId}`
    : `${apiUrl}${analyticsEndpoint}`, {
    headers: {
      'Authorization': token,
    }
  })
  const body = await response.json()

  if (response.ok) return {
    areas: body.areas.map(area => ({...area, total: parseFloat(area.total), limit: parseFloat(area.limit)})),
    categories: body.categories.map(category => ({...category, total: parseFloat(category.total), limit: parseFloat(category.limit)}))
  }
  else return {error: body.error || body.errors || "Unknown error"}
}

export const postAreas = async (token, data) => {
  const response = await fetch(`${apiUrl}${areasEndpoint}`, {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const body = await response.json()

  if (response.ok) return {...body, limit: parseFloat(body.limit)}
  else return {
    error: body.error || body.errors || "Unknown error"
  }
}

export const patchAreas = async (token, id, data) => {
  const response = await fetch(`${apiUrl}${areasEndpoint}/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const body = await response.json()

  if (response.ok) return {...body, limit: parseFloat(body.limit)}
  else return {
    error: body.error || body.errors || "Unknown error"
  }
}

export const postCategories = async (token, data) => {
  const response = await fetch(`${apiUrl}${categoriesEndpoint}`, {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const body = await response.json()

  if (response.ok) return {...body, limit: parseFloat(body.limit)}
  else return {
    error: body.error || body.errors || "Unknown error"
  }
}

export const patchCategories = async (token, id, data) => {
  const response = await fetch(`${apiUrl}${categoriesEndpoint}/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const body = await response.json()

  if (response.ok) return {...body, limit: parseFloat(body.limit)}
  else return {
    error: body.error || body.errors || "Unknown error"
  }
}
