import { HStack, VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useCurrentGoal } from './CurrentGoalProvider'
import { getColor } from '@lib/ui/theme/getters'
import { GoalDeadline } from './GoalDeadline'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { GoalPlan } from './GoalPlan'
import { GoalTaskFactories } from './GoalTaskFactories'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { GoalStatusTag } from './GoalStatusTag'
import { GoalHabits } from './GoalHabits'

const Name = styled(Text)`
  text-align: start;
  font-weight: 500;
  color: ${getColor('contrast')};
  font-size: 16px;
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
`

export const GoalItemContent = () => {
  const { name, emoji, plan, taskFactories, habits } = useCurrentGoal()

  const hasTaskFactories = taskFactories && taskFactories.length > 0

  const hasHabits = habits && habits.length > 0

  return (
    <VStack gap={8}>
      <HStack alignItems="start" justifyContent="space-between" gap={8}>
        <Name>
          <EmojiTextPrefix emoji={emoji} />
          {name}
        </Name>
        <GoalStatusTag />
      </HStack>
      <GoalDeadline />
      {plan && <GoalPlan />}
      {hasTaskFactories && <GoalTaskFactories />}
      {hasHabits && <GoalHabits />}
    </VStack>
  )
}
