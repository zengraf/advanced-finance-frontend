import {apiUrl} from "../constants"

export const loginEndpoint = "/users/sign_in"

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

export const registerEndpoint = "/users"

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
  else return {error: body.error || body.errors || body || "Unknown error"}
}

export const confirmationEndpoint = registerEndpoint + "/confirmation"

export async function confirm(confirmationToken) {
  const response = await fetch(`${apiUrl}${confirmationEndpoint}?confirmation_token=${confirmationToken}`)

  const body = await response.json()

  if (response.ok) return body
  else return {error: body.error || body.errors || body || "Unknown error"}
}