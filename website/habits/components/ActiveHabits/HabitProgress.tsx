import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { range } from '@increaser/utils/array/range'
import { SameWidthChildrenRow } from '@increaser/ui/Layout/SameWidthChildrenRow'
import { D_IN_WEEK, MS_IN_DAY, MS_IN_SEC } from '@increaser/utils/time'

import { useCurrentHabit } from '../CurrentHabitProvider'
import { HabitDay } from './HabitDay'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'

export const HabitProgress = () => {
  const startOfDay = useStartOfDay()
  const { successes, id, hslaColor, startedAt } = useCurrentHabit()

  return (
    <SameWidthChildrenRow gap={4}>
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
    </SameWidthChildrenRow>
  )
}
