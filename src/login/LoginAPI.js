import {apiUrl} from "../constants"

export const endpoint = "/users/sign_in"

export const login = async (email, password) => {
  const response = await fetch(apiUrl + endpoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        email: email,
        password: password
      }
    })
  })

  const body = await response.json()

  if (response.ok) return {
    user: body,
    token: response.headers.get("Authorization")
  }
  else return {
    error: body.error
  }
}