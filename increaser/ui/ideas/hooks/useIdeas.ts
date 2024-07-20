import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { order } from '@lib/utils/array/order'

export const useIdeas = () => {
  const { ideas } = useAssertUserState()

  return useMemo(
    () => order(Object.values(ideas), (idea) => idea.updatedAt, 'desc'),
    [ideas],
  )
}
