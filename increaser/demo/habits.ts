import { startOfDay } from 'date-fns'
import { Habit } from '@increaser/entities/Habit'
import { range } from '@lib/utils/array/range'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { MS_IN_DAY, MS_IN_SEC } from '@lib/utils/time'
import { getRecord } from '@lib/utils/record/getRecord'

enum DemoHabit {
  Sunlight = 'View sunlight after waking up',
  Exercise = 'Exercise or stretching',
  Fasting = 'No food after 7PM',
  Balance = 'No work after dinner',
}

interface HabitDescription extends Pick<Habit, 'id' | 'emoji' | 'color'> {
  target: number
}

const goalDays = 60

const habitsDescription: HabitDescription[] = [
  {
    id: DemoHabit.Sunlight,
    emoji: '🌞',
    target: 1,
    color: 3,
  },
  {
    id: DemoHabit.Exercise,
    emoji: '🏋️‍♂️',
    target: 0.8,
    color: 5,
  },
  {
    id: DemoHabit.Fasting,
    emoji: '🍽',
    target: 0.9,
    color: 10,
  },
  {
    id: DemoHabit.Balance,
    emoji: '🧘‍♂️',
    target: 0.9,
    color: 12,
  },
]

const generateSuccesses = (rate: number) => {
  const today = Date.now()
  return range(goalDays).reduce((acc, index) => {
    if (index < 3 || Math.random() > 1 - rate) {
      acc.push(toHabitDate(new Date(today - index * MS_IN_DAY)))
    }

    return acc
  }, [] as string[])
}

const toHabit = (
  { id, emoji, color, target }: HabitDescription,
  order: number,
): Habit => {
  const dayStartedAt = startOfDay(new Date()).getTime()
  const startedAt = (dayStartedAt - MS_IN_DAY * goalDays) / MS_IN_SEC

  return {
    id,
    name: id,
    emoji,
    order,
    startedAt,
    color,
    successes: generateSuccesses(target),
  }
}

export const getDemoHabits = () =>
  getRecord(
    habitsDescription.map((description, index) => toHabit(description, index)),
    (habit) => habit.id,
  )
