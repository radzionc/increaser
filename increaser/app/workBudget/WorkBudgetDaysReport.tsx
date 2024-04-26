import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfDay } from 'date-fns'
import { useMemo } from 'react'
import { splitBy } from '@lib/utils/array/splitBy'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { AvgDay } from './AvgDay'
import { BarChart } from '@lib/ui/charts/BarChart'
import { getWorkdayColor } from '@increaser/ui/workBudget/getWorkdayColor'
import { getWeekendColor } from '@increaser/ui/workBudget/getWeekendColor'
import { useTheme } from 'styled-components'
import { isWorkday } from '@lib/utils/time/workweek'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'

const maxDays = 30
const minDays = 7

export const WorkBudgetDaysReport = () => {
  const todayStartedAt = useStartOfDay()

  const { sets } = useAssertUserState()

  const lastDayStartedAt = todayStartedAt - convertDuration(1, 'd', 'ms')

  const firstDayStartedAt = useMemo(() => {
    if (!sets.length) return todayStartedAt

    const firstSetDayStartedAt = startOfDay(sets[0].start).getTime()

    return Math.max(
      lastDayStartedAt - maxDays * convertDuration(1, 'd', 'ms'),
      firstSetDayStartedAt,
    )
  }, [lastDayStartedAt, sets, todayStartedAt])

  const days =
    Math.round(lastDayStartedAt - firstDayStartedAt) /
    convertDuration(1, 'd', 'ms')

  const totals = useMemo(() => {
    const result = range(days).map(() => 0)

    sets.forEach((set) => {
      const setDayStartedAt = startOfDay(set.start).getTime()
      const dayIndex = Math.round(
        (setDayStartedAt - firstDayStartedAt) / convertDuration(1, 'd', 'ms'),
      )

      if (dayIndex < 0 || dayIndex >= days) return

      result[dayIndex] += getSetDuration(set)
    })

    return result
  }, [days, firstDayStartedAt, sets])

  const [workdays, weekends] = useMemo(() => {
    return splitBy(totals, (total, index) => {
      const timestamp =
        firstDayStartedAt + index * convertDuration(1, 'd', 'ms')
      return isWorkday(timestamp) ? 0 : 1
    })
  }, [firstDayStartedAt, totals])

  const theme = useTheme()

  if (days < minDays) {
    return (
      <ShyInfoBlock>
        After {minDays} days of using the app, you'll access a report that shows
        your average work hours on weekdays and weekends.
      </ShyInfoBlock>
    )
  }

  return (
    <VStack gap={20}>
      <Text color="contrast" weight="semibold">
        Last {days} days report
      </Text>
      <UniformColumnGrid gap={20}>
        <AvgDay value={workdays} name="workday" />
        <AvgDay value={weekends} name="weekend" />
      </UniformColumnGrid>
      <BarChart
        expectedLabelHeight={0}
        expectedValueHeight={0}
        height={60}
        items={totals.map((value, index) => {
          const dayStartedAt =
            firstDayStartedAt + index * convertDuration(1, 'd', 'ms')
          return {
            value,
            color: isWorkday(dayStartedAt)
              ? getWorkdayColor(theme)
              : getWeekendColor(theme),
          }
        })}
      />
    </VStack>
  )
}
