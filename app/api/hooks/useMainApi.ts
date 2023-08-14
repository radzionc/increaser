import { useAuth } from 'auth/hooks/useAuth'
import { assertDefined } from 'shared/utils/assertDefined'

export interface QueryMainApiParams {
  query: string
  variables?: Record<string, any>
}

interface MainApiResponse<T> {
  data: Record<string, T>
  errors: ApiError[]
}

interface ApiError {
  message: string
  extensions: {
    code: string
  }
}

export class MainApiError extends Error {}

class HttpError extends Error {
  public status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export const useMainApi = () => {
  const { unauthorize, token } = useAuth()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = token
  }

  const query = async function queryMainApi<T>(
    payload: QueryMainApiParams,
  ): Promise<T> {
    const mainApiUrl = assertDefined(process.env.NEXT_PUBLIC_API_URL)

    const response = await window.fetch(mainApiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText)
    }

    const { data, errors } = (await response.json()) as MainApiResponse<T>

    if (errors?.length) {
      const { message, extensions } = errors[0]
      if (extensions?.code === 'UNAUTHENTICATED') {
        console.log('Unauthorize because of API UNAUTHENTICATED error')
        unauthorize()
      }

      throw new MainApiError(message)
    }

    return Object.values(data)[0]
  }

  return { query }
}
