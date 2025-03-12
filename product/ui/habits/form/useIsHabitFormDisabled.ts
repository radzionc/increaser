import { HabitFormShape } from '@product/ui/habits/form/HabitFormShape'
import { useMemo } from 'react'

export const useIsHabitFormDisabled = ({ name }: HabitFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])
}
