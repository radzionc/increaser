import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { order } from '@lib/utils/array/order'

export const usePrinciples = () => {
  const { principles } = useAssertUserState()

  return useMemo(
    () =>
      order(Object.values(principles), ({ updatedAt }) => updatedAt, 'desc'),
    [principles],
  )
}
