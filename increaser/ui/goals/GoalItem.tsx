import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { GoalItemContent } from './GoalItemContent'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentGoal } from './CurrentGoalProvider'

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
