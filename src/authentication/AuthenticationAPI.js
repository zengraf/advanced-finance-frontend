import {apiUrl} from "../constants"

export const loginEndpoint = "/users/sign_in"
export const registerEndpoint = "/users"

export async function login(email, password) {
  const response = await fetch(apiUrl + loginEndpoint, {
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
  else return body
}

export async function register(username, email, password, passwordConfirmation) {
  const response = await fetch(apiUrl + registerEndpoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: username,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
    })
  })

  const body = await response.json()

  if (response.ok) return {
    user: body
  }
  else return body
}