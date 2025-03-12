import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'

import { useCurrentGoal } from './CurrentGoalProvider'
import { GoalItemContent } from './GoalItemContent'

const Container = styled(Hoverable)`
  ${verticalPadding(12)};
  text-align: start;
  width: 100%;
`

export const GoalItem = () => {
  const { id } = useCurrentGoal()
  const [, setActiveItemId] = useActiveItemId()

  return (
    <Container onClick={() => setActiveItemId(id)} verticalOffset={0}>
      <GoalItemContent />
    </Container>
  )
}
