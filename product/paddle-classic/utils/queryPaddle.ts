import { getSecret } from '@product/secrets'

const paddleBaseUrl = 'https://vendors.paddle.com/api/2.0'

export const queryPaddle = async <T>(
  endpoint: string,
  payload: Record<string, any> = {},
): Promise<T> => {
  const formData = new URLSearchParams(payload)

  const url = [paddleBaseUrl, endpoint].join('/')
  const apiKey = await getSecret('paddleApiKey')
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData.toString(),
  })

  const { response } = await result.json()

  return response
}
