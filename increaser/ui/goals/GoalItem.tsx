import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { goalVerticalPadding } from './config'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentGoal } from './CurrentGoalProvider'
import { EditGoalForm } from './form/EditGoalForm'
import { GoalItemContent } from './GoalItemContent'

const Container = styled(Hoverable)`
  ${verticalPadding(goalVerticalPadding)};
  text-align: start;
  width: 100%;
`

export const GoalItem = () => {
  const { id } = useCurrentGoal()

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
      <GoalItemContent />
    </Container>
  )
}
