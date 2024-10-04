import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { order } from '@lib/utils/array/order'

export const useIdeas = () => {
  const { ideas } = useUser()

  return useMemo(
    () => order(Object.values(ideas), (idea) => idea.updatedAt, 'desc'),
    [ideas],
  )
}
