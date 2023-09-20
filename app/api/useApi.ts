import { ApiErrorCode } from '@increaser/api/errors/ApiErrorCode'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { print } from 'graphql'
import { useAuth } from 'auth/components/AuthProvider'
import { useAuthToken } from 'auth/hooks/useAuthToken'

interface ApiErrorInfo {
  message: string
  extensions: {
    code: string
  }
}

interface ApiResponse<T> {
  data: T
  errors: ApiErrorInfo[]
}

export class ApiError extends Error {}

class HttpError extends Error {
  public status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export type QueryApiError = ApiError | HttpError

export type Variables = Record<string, unknown>

export type QueryApi = <T, V extends Variables = Variables>(
  document: TypedDocumentNode<T, V>,
  variables?: V,
) => Promise<T>

export const useApi = () => {
  const { unauthorize } = useAuth()
  const [token] = useAuthToken()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = token
  }

  const query: QueryApi = async <T, V>(
    document: TypedDocumentNode<T, V>,
    variables?: V,
  ) => {
    const apiUrl = shouldBeDefined(process.env.NEXT_PUBLIC_API_URL)

    const response = await window.fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: print(document),
        variables,
      }),
    })

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText)
    }

    const { data, errors } = (await response.json()) as ApiResponse<T>

    if (errors?.length) {
      const { message, extensions } = errors[0]
      if (extensions?.code === ApiErrorCode.Unauthenticated) {
        unauthorize()
      }

      throw new ApiError(message)
    }

    return data
  }

  return { query }
}
