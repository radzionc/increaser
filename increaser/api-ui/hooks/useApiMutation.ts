import {
  ApiInterface,
  ApiMethodName,
} from '@increaser/api-interface/ApiInterface'
import { useMutation } from '@tanstack/react-query'
import { useApi } from './useApi'

interface ApiMutationOptions<M extends ApiMethodName> {
  onSuccess?: (data: ApiInterface[M]['output']) => void
  onError?: (error: unknown) => void
}

export const useApiMutation = <M extends ApiMethodName>(
  method: M,
  options: ApiMutationOptions<M> = {},
) => {
  const api = useApi()

  return useMutation({
    mutationFn: (input: ApiInterface[M]['input']) => api.call(method, input),
    ...options,
  })
}
