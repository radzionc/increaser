import { order } from '@lib/utils/array/order'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const usePrinciples = () => {
  const { principles } = useUser()

  return useMemo(
    () =>
      order(Object.values(principles), ({ updatedAt }) => updatedAt, 'desc'),
    [principles],
  )
}
