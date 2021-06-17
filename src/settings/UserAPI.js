import {apiUrl} from "../constants";
import axios from "axios";

export const endpoint = "/user"

export async function show(token) {
  const response = await fetch(apiUrl + endpoint, {headers: {'Authorization': token}})
  const body = response.json()

  if (response.ok) return body
  else return {error: body.error || body.errors || "Unknown error"}
}

export async function currencies(token) {
  const response = await fetch(`${apiUrl}${endpoint}/currencies`, {headers: {'Authorization': token}})
  const body = response.json()

  if (response.ok) return body
  else return {error: body.error || body.errors || "Unknown error"}
}

export async function update(token, data) {
  const formData = new FormData()

  formData.append('user[username]', data.username)
  if (data.avatar != null)
    formData.append('user[avatar]', data.avatar)

  const response = await axios({
    url: endpoint,
    method: 'PATCH',
    baseURL: apiUrl,
    headers: {
      'Authorization': token
    },
    data: formData
  })

  const body = response.data

  if (response.status === 200) return body
  else return {error: body.error || body.errors || "Unknown error"}
}