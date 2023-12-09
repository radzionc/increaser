import { ReactNode } from 'react'
import { useOnQuerySuccess } from '../hooks/useOnQuerySuccess'

type QueryStatus = 'idle' | 'error' | 'loading' | 'success'

export interface QueryDependantProps<T> {
  status: QueryStatus
  data: T | undefined
  error: () => ReactNode
  loading: () => ReactNode
  success: (data: T) => ReactNode
  idle?: () => ReactNode
  onSuccess?: (data: T) => void
}

export function QueryDependant<T>({
  status,
  data,
  error,
  loading,
  success,
  idle,
  onSuccess = () => {},
}: QueryDependantProps<T>) {
  useOnQuerySuccess({ data }, onSuccess)

  if (status === 'error') {
    return <>{error()}</>
  }

  if (status === 'loading') {
    return <>{loading()}</>
  }

  if (data !== undefined) {
    return <>{success(data)}</>
  }

  if (status === 'idle' && idle) {
    return <>{idle()}</>
  }

  return null
}

export type QueryDependantWrapperProps<T> = Pick<
  QueryDependantProps<T>,
  'success' | 'onSuccess'
> &
  Partial<Pick<QueryDependantProps<T>, 'error' | 'loading' | 'idle'>>
