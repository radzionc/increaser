import { getProjectsTotalRecord } from 'projects/helpers/getProjectsTotalRecord'
import { useMemo } from 'react'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { useCurrentWeekSets } from 'sets/hooks/useCurrentWeekSets'
import { useStartOfWeek } from 'shared/hooks/useStartOfWeek'
import { useWeekday } from 'shared/hooks/useWeekday'
import { formatDuration } from 'shared/utils/formatDuration'
import { range } from '@increaser/utils/range'
import { useTheme } from 'styled-components'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'
import { D_IN_WEEK, MS_IN_DAY, MS_IN_MIN, getShortWeekday } from 'utils/time'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'
import { AllocationLine } from 'ui/AllocationLine'
import { Bar, BasicBarChart } from 'ui/BasicBarChart'

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
              {formatDuration(total, 'ms')}
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
