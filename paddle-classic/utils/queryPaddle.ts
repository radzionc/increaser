import { getEnvVar } from './getEnvVar'

const paddleBaseUrl = 'https://vendors.paddle.com/api/2.0'

export const queryPaddle = async <T>(
  endpoint: string,
  body: Record<string, any> = {},
): Promise<T> => {
  const url = [paddleBaseUrl, endpoint].join('/')
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getEnvVar('PADDLE_API_KEY')}`,
    },
    body: JSON.stringify({
      vendor_id: getEnvVar('PADDLE_VENDOR_ID'),
      vendor_auth_code: getEnvVar('PADDLE_API_KEY'),
      ...body,
    }),
  })

  const { response } = await result.json()

  return response
}
