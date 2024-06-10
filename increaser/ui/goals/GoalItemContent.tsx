import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { goalContentMinHeight } from './config'
import { useCurrentGoal } from './CurrentGoalProvider'
import { GoalStatusTag } from './GoalStatusTag'
import { getColor } from '@lib/ui/theme/getters'
import { GoalDeadline } from './GoalDeadline'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'

const Name = styled(Text)`
  text-align: start;
  font-weight: 500;
  color: ${getColor('contrast')};
  font-size: 16px;
  line-height: ${toSizeUnit(goalContentMinHeight)};
`

export const GoalItemContent = () => {
  const { name, status, emoji } = useCurrentGoal()

  return (
    <VStack gap={4}>
      <HStack alignItems="start" justifyContent="space-between" gap={8}>
        <Name>
          <EmojiTextPrefix emoji={emoji} />
          {name}
        </Name>
        <GoalStatusTag value={status} />
      </HStack>
      <GoalDeadline />
    </VStack>
  )
}
