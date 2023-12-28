import { getProjectsTotalRecord } from '@increaser/app/projects/helpers/getProjectsTotalRecord'
import { useMemo } from 'react'
import { getSetsSum } from '@increaser/app/sets/helpers/getSetsSum'
import { useCurrentWeekSets } from '@increaser/app/sets/hooks/useCurrentWeekSets'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { range } from '@lib/utils/array/range'
import { useTheme } from 'styled-components'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'
import {
  D_IN_WEEK,
  MS_IN_DAY,
  MS_IN_MIN,
  getShortWeekday,
} from '@lib/utils/time'
import { useWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/hooks/useWeekTimeAllocation'
import { AllocationLine } from '@increaser/app/ui/AllocationLine'
import { Bar, BasicBarChart } from '@increaser/app/ui/BasicBarChart'

export const ProjectsCurrentWeek = () => {
  const currentWeekSets = useCurrentWeekSets()

  const startOfWeek = useStartOfWeek()
  const currentWeekday = useWeekday()

  const { primaryGoal } = useAssertUserState()

  const { allocation } = useWeekTimeAllocation()

  const theme = useTheme()

  const groupedSets = range(D_IN_WEEK).map((index) => {
    const dayStartsAt = startOfWeek + MS_IN_DAY * index
    const dayEndsAt = dayStartsAt + MS_IN_DAY
    return currentWeekSets.filter(
      (set) => set.end < dayEndsAt && set.start > dayStartsAt,
    )
  })

  const bars: Bar[] = useMemo(() => {
    return range(D_IN_WEEK).map((index) => {
      const daySets = groupedSets[index]
      const total = getSetsSum(daySets)
      const projectsTotal = getProjectsTotalRecord(daySets)

      const isToday = index === currentWeekday

      return {
        displayValue:
          total > 0 ? (
            <Text color={isToday ? 'regular' : 'supporting'}>
              {formatDuration(total, 'ms', { maxUnit: 'h' })}
            </Text>
          ) : undefined,
        label: getShortWeekday(index),
        segments: Object.entries(projectsTotal).map(([, seconds]) => ({
          color: isToday ? theme.colors.mistExtra : theme.colors.mist,
          value: seconds,
        })),
      }
    })
  }, [currentWeekday, groupedSets, theme])

  return (
    <VStack gap={16}>
      <BasicBarChart height={140} bars={bars} />
      {primaryGoal === 'workMore' && (
        <HStack fullWidth gap={4}>
          {range(D_IN_WEEK).map((index) => {
            const daySets = groupedSets[index]
            const total = getSetsSum(daySets) / MS_IN_MIN

            return (
              <AllocationLine
                key={index}
                segments={[
                  {
                    color:
                      total < allocation[index]
                        ? theme.colors.mistExtra
                        : theme.colors.success,
                    proportion: total / allocation[index],
                  },
                ]}
              />
            )
          })}
        </HStack>
      )}
    </VStack>
  )
}
