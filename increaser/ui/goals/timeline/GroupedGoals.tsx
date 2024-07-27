import { useMemo } from 'react'
import { groupItems } from '@lib/utils/array/groupItems'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { useGoalsTimeline } from './state/GoalsTimelineContext'
import styled from 'styled-components'
import { goalsTimelineConfig } from './config'
import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { toPercents } from '@lib/utils/toPercents'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import { VStack } from '@lib/ui/layout/Stack'
import { useActiveGoals } from '../hooks/useActiveGoals'
import { CurrentGoalProvider } from '../CurrentGoalProvider'
import { TimelineGoalItem } from './TimelineGoalItem'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

const Container = styled(VStack)`
  position: relative;
  width: 100%;
`

export const GroupedGoals = () => {
  const items = useActiveGoals()
  const { dob, interval } = useGoalsTimeline()

  const intervalDuration = getIntervalDuration(interval)

  const groupedGoals = useMemo(() => {
    return groupItems(items, ({ deadlineAt }) =>
      getGoalDeadlineTimestamp({
        deadlineAt: shouldBePresent(deadlineAt),
        dob,
      }),
    )
  }, [dob, items])

  const maxGroupSize = Math.max(
    ...Object.values(groupedGoals).map((group) => group.length),
  )

  return (
    <Container
      style={{
        height:
          maxGroupSize * goalsTimelineConfig.goalHeight +
          goalsTimelineConfig.goalsGap * (maxGroupSize - 1),
      }}
    >
      {getRecordKeys(groupedGoals).map((timestamp) => {
        const goals = groupedGoals[timestamp]
        return (
          <PositionAbsolutelyCenterVertically
            key={timestamp}
            fullHeight
            left={toPercents(
              ((timestamp as number) - interval.start) / intervalDuration,
            )}
          >
            <VStack
              fullHeight
              justifyContent="end"
              gap={goalsTimelineConfig.goalsGap}
            >
              {goals.map((goal, index) => (
                <CurrentGoalProvider value={goal} key={index}>
                  <TimelineGoalItem />
                </CurrentGoalProvider>
              ))}
            </VStack>
          </PositionAbsolutelyCenterVertically>
        )
      })}
    </Container>
  )
}
