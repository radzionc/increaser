import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { order } from '@lib/utils/array/order'

export const useOrderedHabits = () => {
  const { habits } = useAssertUserState()

  return useMemo(
    () => order(Object.values(habits), ({ order }) => order, 'asc'),
    [habits],
  )
}
