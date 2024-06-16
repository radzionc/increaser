import { useMemo } from 'react'
import { groupItems } from '@lib/utils/array/groupItems'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { useGoalsTimeline } from './state/GoalsTimelineContext'
import styled, { useTheme } from 'styled-components'
import { goalsTimelineConfig } from './config'
import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { toPercents } from '@lib/utils/toPercents'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import { VStack } from '@lib/ui/layout/Stack'
import { round } from '@lib/ui/css/round'
import { getColor } from '@lib/ui/theme/getters'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { getGoalStatusColor } from '../getGoalStatusColor'
import { useActiveGoals } from '../hooks/useActiveGoals'

const Container = styled(VStack)`
  position: relative;
  width: 100%;
`

const Goal = styled.div`
  border: 2px solid ${getColor('mistExtra')};
  ${round}
  color: ${getColor('contrast')};
  background: ${getColor('background')};

  ${centerContent};
  ${sameDimensions(goalsTimelineConfig.goalHeight)};
  position: relative;
  font-size: 20px;
`

const Indicator = styled.div`
  position: absolute;
  ${sameDimensions(8)};
  ${round};
  right: 0;
  bottom: 0;
`

export const GroupedGoals = () => {
  const items = useActiveGoals()
  const { dob, interval } = useGoalsTimeline()

  const intervalDuration = getIntervalDuration(interval)

  const theme = useTheme()

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
                <Goal key={index}>
                  {goal.emoji}
                  <Indicator
                    style={{
                      background: getGoalStatusColor(
                        goal.status,
                        theme,
                      ).toCssValue(),
                    }}
                  />
                </Goal>
              ))}
            </VStack>
          </PositionAbsolutelyCenterVertically>
        )
      })}
    </Container>
  )
}
