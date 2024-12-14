import { ApiError } from '@increaser/api-interface/ApiError'

export const queryOAuthProvider = async <T>(
  action: string,
  ...args: Parameters<typeof fetch>
) => {
  const response = await fetch(...args)

  if (!response.ok) {
    let message = response.statusText
    try {
      message = await response.text()
    } catch {}

    throw new ApiError('invalidInput', `${action} failed: ${message}`)
  }

  return (await response.json()) as T
}
