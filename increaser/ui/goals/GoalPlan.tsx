import { useCurrentGoal } from './CurrentGoalProvider'
import { text } from '@lib/ui/text'
import styled from 'styled-components'

const Container = styled.p`
  ${text({
    color: 'supporting',
    height: 'l',
  })}
  white-space: pre-line;
`

export const GoalPlan = () => {
  const { plan } = useCurrentGoal()

  return <Container>{plan}</Container>
}
