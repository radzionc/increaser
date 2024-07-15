import { useMemo } from 'react'
import { HabitFormShape } from './HabitFormShape'

export const useIsHabitFormDisabled = ({ name }: HabitFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])
}
