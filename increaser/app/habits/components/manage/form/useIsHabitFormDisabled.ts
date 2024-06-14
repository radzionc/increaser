import { useMemo } from 'react'
import { HabitFormShape } from '../../HabitForm/HabitFormShape'

export const useIsHabitFormDisabled = ({ name }: HabitFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])
}
