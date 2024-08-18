import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'

export const useVisionAttributes = () => {
  const { vision } = useAssertUserState()

  return useMemo(() => Object.values(vision), [vision])
}
