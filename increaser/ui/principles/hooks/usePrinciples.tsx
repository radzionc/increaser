import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { order } from '@lib/utils/array/order'

export const usePrinciples = () => {
  const { principles } = useUser()

  return useMemo(
    () =>
      order(Object.values(principles), ({ updatedAt }) => updatedAt, 'desc'),
    [principles],
  )
}
