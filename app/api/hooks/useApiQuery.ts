import { withoutUndefined } from '@increaser/utils/array/withoutUndefined'
import { useQuery } from 'react-query'
import { useApi } from './useApi'
import {
  ApiInterface,
  ApiMethodName,
} from '@increaser/api-interface/ApiInterface'

export const getApiQueryKey = <M extends ApiMethodName>(
  method: M,
  input: ApiInterface[M]['input'],
) => withoutUndefined([method, input])

export const useApiQuery = <M extends ApiMethodName>(
  method: M,
  input: ApiInterface[M]['input'],
) => {
  const { call } = useApi()

  return useQuery(getApiQueryKey(method, input), () => call(method, input))
}
