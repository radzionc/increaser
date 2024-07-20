import { useMemo } from 'react'
import { IdeaFormShape } from './IdeaFormShape'

export const useIsIdeaFormDisabled = ({ name }: IdeaFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])
}
