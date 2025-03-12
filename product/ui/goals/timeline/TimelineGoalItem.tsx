import { centerContent } from '@lib/ui/css/centerContent'
import { interactive } from '@lib/ui/css/interactive'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { VStack } from '@lib/ui/css/stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { ScheduledGoal } from '@product/entities/Goal'
import styled, { useTheme } from 'styled-components'

import { useCurrentGoal } from '../CurrentGoalProvider'
import { getGoalStatusColor } from '../getGoalStatusColor'
import { GoalDeadline } from '../GoalDeadline'

import { goalsTimelineConfig } from './config'

const Container = styled.div`
  ${interactive};
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

export const TimelineGoalItem = () => {
  const { emoji, status, id, name } = useCurrentGoal() as ScheduledGoal

  const theme = useTheme()

  const [, setActiveItemId] = useActiveItemId()

  return (
    <Tooltip
      renderOpener={(props) => (
        <Container {...props} onClick={() => setActiveItemId(id)}>
          {emoji}
          <Indicator
            style={{
              background: getGoalStatusColor(status, theme).toCssValue(),
            }}
          />
        </Container>
      )}
      content={
        <VStack gap={4}>
          <Text color="contrast">{name}</Text>
          <GoalDeadline />
        </VStack>
      }
    />
  )
}
