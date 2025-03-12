import { VStack } from '@lib/ui/css/stack'
import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import { groupItems } from '@lib/utils/array/groupItems'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import { toPercents } from '@lib/utils/toPercents'
import { getGoalDeadlineTimestamp } from '@product/entities-utils/goal/getGoalDeadlineTimestamp'
import { useMemo } from 'react'
import styled from 'styled-components'

import { useUser } from '../../user/state/user'
import { CurrentGoalProvider } from '../CurrentGoalProvider'
import { useFilteredScheduledGoals } from '../filter/useFilteredScheduledGoals'

import { goalsTimelineConfig } from './config'
import { useGoalsTimeline } from './state/GoalsTimelineContext'
import { TimelineGoalItem } from './TimelineGoalItem'

const Container = styled(VStack)`
  position: relative;
  width: 100%;
`

export const GroupedGoals = () => {
  const items = useFilteredScheduledGoals()
  const { interval } = useGoalsTimeline()
  const { dob } = useUser()

  const intervalDuration = getIntervalDuration(interval)

  const groupedGoals = useMemo(() => {
    return groupItems(items, ({ deadlineAt }) =>
      getGoalDeadlineTimestamp({
        deadlineAt,
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
