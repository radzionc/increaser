import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { order } from '@lib/utils/array/order'

export const useOrderedHabits = () => {
  const { habits } = useUser()

  return useMemo(
    () => order(Object.values(habits), ({ order }) => order, 'asc'),
    [habits],
  )
}
