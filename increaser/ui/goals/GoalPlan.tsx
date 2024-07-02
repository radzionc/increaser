import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useCurrentGoal } from './CurrentGoalProvider'
import styled from 'styled-components'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { getColor } from '@lib/ui/theme/getters'
import { Text } from '@lib/ui/text'
import { MapIcon } from '@lib/ui/icons/MapIcon'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { GoalTaskFactories } from './GoalTaskFactories'

const lineHeight = 22

const Container = styled(HStack)`
  font-size: 14px;
  align-items: start;
  line-height: ${toSizeUnit(lineHeight)};
  gap: 8px;
  color: ${getColor('textSupporting')};

  p {
    white-space: pre-line;
  }
`

const IconContainer = styled(IconWrapper)`
  height: ${toSizeUnit(lineHeight)};
`

export const GoalPlan = () => {
  const { plan, taskFactories } = useCurrentGoal()
  const hasRecurringTasks = taskFactories && taskFactories.length

  if (!plan && !hasRecurringTasks) return null

  return (
    <Container>
      <IconContainer>
        <MapIcon />
      </IconContainer>
      <VStack gap={8}>
        <Text>{plan}</Text>
        {hasRecurringTasks && <GoalTaskFactories />}
      </VStack>
    </Container>
  )
}
