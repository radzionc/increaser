import { startOfDay } from 'date-fns'
import { Habit, HabitResponse } from '../habits/Habit'
import { range } from '../shared/utils/range'
import { toHabitDate } from '../habits/utils/toHabitDate'
import { MS_IN_DAY, MS_IN_SEC } from '@increaser/ui/shared/utils/time'

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
): HabitResponse => {
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
  habitsDescription.map((description, index) => toHabit(description, index))
