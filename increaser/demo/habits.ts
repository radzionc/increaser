import { startOfDay } from 'date-fns'
import { Habit } from '@increaser/entities/Habit'
import { range } from '@lib/utils/array/range'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { MS_IN_DAY } from '@lib/utils/time'
import { recordFromItems } from '@lib/utils/record/recordFromItems'

export enum DemoHabit {
  Sunlight = 'View sunlight after waking up',
  Exercise = 'Physical exercise',
  Fasting = 'No food after 7PM',
  Balance = 'No work after dinner',
  WalkAfterDinner = 'Walk after dinner',
  PrepareForTomorrow = 'Prepare for tomorrow',
}

interface HabitDescription extends Pick<Habit, 'id' | 'emoji'> {
  target: number
  checkedToday?: boolean
}

const goalDays = 60

const habitsDescription: HabitDescription[] = [
  {
    id: DemoHabit.Sunlight,
    emoji: '🌞',
    target: 1,
    checkedToday: true,
  },
  {
    id: DemoHabit.Exercise,
    emoji: '🏋️‍♂️',
    target: 0.8,
    checkedToday: true,
  },
  {
    id: DemoHabit.Fasting,
    emoji: '🍽',
    target: 0.9,
    checkedToday: true,
  },
  {
    id: DemoHabit.Balance,
    emoji: '🧘‍♂️',
    target: 0.9,
    checkedToday: true,
  },
  {
    id: DemoHabit.WalkAfterDinner,
    emoji: '🚶‍♂️',
    target: 0.9,
    checkedToday: false,
  },
  {
    id: DemoHabit.PrepareForTomorrow,
    emoji: '📝',
    target: 0.9,
    checkedToday: false,
  },
]

const generateSuccesses = (rate: number) => {
  const today = Date.now()
  return range(goalDays).reduce((acc, index) => {
    if (index < 3 || Math.random() > 1 - rate) {
      acc.push(toHabitDate(today - index * MS_IN_DAY))
    }

    return acc
  }, [] as string[])
}

const toHabit = (
  { id, emoji, target, checkedToday }: HabitDescription,
  order: number,
): Habit => {
  const dayStartedAt = startOfDay(new Date()).getTime()
  const startedAt = dayStartedAt - MS_IN_DAY * goalDays
  let successes = generateSuccesses(target)
  if (!checkedToday) {
    successes = successes.slice(1)
  }

  return {
    id,
    name: id,
    emoji,
    order,
    startedAt,
    successes,
  }
}

export const getDemoHabits = () =>
  recordFromItems(
    habitsDescription.map((description, index) => toHabit(description, index)),
    (habit) => habit.id,
  )
