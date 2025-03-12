import { useMemo } from 'react'

import { PrincipleFormShape } from './PrincipleFormShape'

export const useIsPrincipleFormDisabled = ({ name }: PrincipleFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])
}
