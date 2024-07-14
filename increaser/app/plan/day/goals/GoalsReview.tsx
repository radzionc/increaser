import { VStack } from '@lib/ui/layout/Stack'
import { ActiveGoals } from '../../../goals/ActiveGoals'
import styled from 'styled-components'

const Container = styled(VStack)`
  max-width: 560px;
  gap: 40px;
`

export const GoalsReview = () => (
  <Container>
    <ActiveGoals />
  </Container>
)
