import { useMemo } from 'react'

import { PrincipleCategoryFormShape } from './PrincipleCategoryFormShape'

export const useIsPrincipleCategoryFormDisabled = ({
  name,
}: PrincipleCategoryFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])
}
