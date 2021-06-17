import {apiUrl} from "../constants";

export const endpoint = '/currencies'

export const index = async (token) => {
  const response = await fetch(apiUrl + endpoint, {
    headers: { 'Authorization': token }
  })

  const body = await response.json()

  if (response.ok) return body
  else return {error: body.error || body.errors || "Unknown error"}
}

export const show = async (token, currency) => {
  const response = await fetch(`${apiUrl}${endpoint}/${currency.id}`, {
    headers: { 'Authorization': token }
  })

  const body = await response.json()

  if (response.ok) return {
    ...body,
    selling_rates: body.selling_rates.map(rate => ({...rate, rate: parseFloat(rate.rate)})),
    purchase_rates: body.purchase_rates.map(rate => ({...rate, rate: parseFloat(rate.rate)}))
  }
  else return {error: body.error || body.errors || "Unknown error"}
}

export const post = async (token, currency) => {
  const response = await fetch(`${apiUrl}${endpoint}?id=${currency.id}`, {
    method: 'POST',
    headers: { 'Authorization': token },
  })

  const body = await response.json()

  if (response.ok) return body
  else return {error: body.error || body.errors || "Unknown error"}
}

export const destroy = async (token, currency) => {
  const response = await fetch(`${apiUrl}${endpoint}/${currency.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': token },
  })

  return response.ok
}