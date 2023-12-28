import { Habit } from '@increaser/app/habits/Habit'

export const orderHabits = (habits: Habit[]) => {
  const orderedHabits = [...habits]

  orderedHabits.sort((a, b) => a.order - b.order)

  return orderedHabits
}
