import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { goalContentMinHeight, goalVerticalPadding } from './config'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentGoal } from './CurrentGoalProvider'
import { EditGoalForm } from './form/EditGoalForm'
import { GoalStatusTag } from './GoalStatusTag'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(Hoverable)`
  ${verticalPadding(goalVerticalPadding)};
  text-align: start;
  width: 100%;
`

const Name = styled(Text)`
  text-align: start;
  font-weight: 500;
  color: ${getColor('contrast')};
  font-size: 14px;
  line-height: ${toSizeUnit(goalContentMinHeight)};
`

export const GoalItem = () => {
  const { name, status, id } = useCurrentGoal()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditGoalForm />
  }

  return (
    <Container
      onClick={() => {
        setActiveItemId(id)
      }}
      verticalOffset={0}
    >
      <HStack alignItems="start" justifyContent="space-between" gap={8}>
        <Name>{name}</Name>
        <GoalStatusTag value={status} />
      </HStack>
    </Container>
  )
}
