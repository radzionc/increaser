import styled from 'styled-components'
import { SessionStartedAt } from './SessionStartedAt'
import { FocusProject } from './FocusProject'
import { FocusGoal } from './FocusGoal'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 4px;
`

export const FocusSessionInfo = () => (
  <Container>
    <SessionStartedAt />
    <FocusProject />
    <FocusGoal />
  </Container>
)
