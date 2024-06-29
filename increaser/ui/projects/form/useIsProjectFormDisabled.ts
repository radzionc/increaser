import { useMemo } from 'react'
import { ProjectFormShape } from './ProjectFormShape'

export const useIsProjectFormDisabled = ({ name }: ProjectFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])
}
