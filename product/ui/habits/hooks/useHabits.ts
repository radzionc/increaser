import { useMemo } from 'react'

import { useUser } from '../../user/state/user'

export const useHabits = () => {
  const { habits } = useUser()

  return useMemo(() => Object.values(habits), [habits])
}
