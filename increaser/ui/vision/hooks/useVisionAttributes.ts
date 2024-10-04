import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'

export const useVisionAttributes = () => {
  const { vision } = useUser()

  return useMemo(() => Object.values(vision), [vision])
}
