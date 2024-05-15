import { useMemo } from 'react'
import { ProjectFields } from './ProjectFields'

export const useIsProjectFormDisabled = (value: ProjectFields) => {
  return useMemo(() => {
    if (!value.name) {
      return 'Name is required'
    }
  }, [value.name])
}
