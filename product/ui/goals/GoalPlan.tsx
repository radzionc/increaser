import { text } from '@lib/ui/text'
import styled from 'styled-components'

import { useCurrentGoal } from './CurrentGoalProvider'

const Container = styled.p`
  ${text({
    color: 'shy',
    height: 'l',
  })}
  white-space: pre-line;
`

export const GoalPlan = () => {
  const { plan } = useCurrentGoal()

  return <Container>{plan}</Container>
}
