import { useMemo } from 'react'

import { VisionAttributeFormShape } from './VisionAttributeFormShape'

export const useIsVisionAttributeFormDisabled = ({
  name,
}: VisionAttributeFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])
}
