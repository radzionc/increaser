import { UseQueryResult } from 'react-query'
import { useEffectOnDependencyChange } from '../../hooks/useEffectOnDependencyChange'

export const useOnQuerySuccess = <T>(
  { data }: Pick<UseQueryResult<T>, 'data'>,
  onSuccess: (data: T) => void,
) => {
  useEffectOnDependencyChange(() => {
    if (data) {
      onSuccess(data)
    }
  }, [data])
}
