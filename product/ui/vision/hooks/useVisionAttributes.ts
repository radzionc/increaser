import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const useVisionAttributes = () => {
  const { vision } = useUser()

  return useMemo(() => Object.values(vision), [vision])
}
