import fetch from 'node-fetch'
import { AuthenticationError } from '../../errors/AuthenticationError'

export const queryOAuthProvider = async <T>(
  action: string,
  ...args: Parameters<typeof fetch>
) => {
  const response = await fetch(...args)

  if (!response.ok) {
    let message = response.statusText
    try {
      message = await response.text()
    } catch (err) {}

    throw new AuthenticationError(`${action} failed: ${message}`)
  }

  return (await response.json()) as T
}
