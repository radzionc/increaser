import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { range } from '@lib/utils/array/range'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { D_IN_WEEK, MS_IN_DAY, MS_IN_SEC } from '@lib/utils/time'

import { HabitDay } from './HabitDay'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'

export const HabitProgress = () => {
  const startOfDay = useStartOfDay()
  const { successes, id, hslaColor, startedAt } = useCurrentHabit()

  return (
    <UniformColumnGrid gap={4}>
      {range(D_IN_WEEK).map((index) => {
        const timestamp = startOfDay - index * MS_IN_DAY

        if (timestamp < startedAt * MS_IN_SEC - MS_IN_DAY) {
          return <div key={index} />
        }

        const date = new Date(timestamp)
        return (
          <HabitDay
            key={index}
            value={successes.includes(toHabitDate(date))}
            date={date}
            id={id}
            color={hslaColor}
          />
        )
      })}
    </UniformColumnGrid>
  )
}
