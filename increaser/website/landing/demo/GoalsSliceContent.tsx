import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import { order } from '@lib/utils/array/order'
import styled from 'styled-components'
import { GoalItemContent } from '@increaser/ui/goals/GoalItemContent'
import { VStack } from '@lib/ui/layout/Stack'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 560px;
  width: 100%;
`

export const GoalsSliceContent = () => {
  const { goals } = useAssertUserState()
  const items = order(Object.values(goals), (item) => item.order, 'asc')

  return (
    <Container>
      {items.map((item) => (
        <CurrentGoalProvider key={item.id} value={item}>
          <GoalItemContent />
        </CurrentGoalProvider>
      ))}
    </Container>
  )
}
