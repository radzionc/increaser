import { order } from '@lib/utils/array/order'
import { useAssertUserState } from '../../user/UserStateContext'
import { useMemo } from 'react'

export const useActiveGoals = () => {
  const { goals } = useAssertUserState()
  return useMemo(() => {
    const items = Object.values(goals).filter((goal) => goal.status !== 'done')
    return order(items, (item) => item.order, 'asc')
  }, [goals])
}
