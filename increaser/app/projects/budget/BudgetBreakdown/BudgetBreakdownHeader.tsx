import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { BudgetBreakdownRowContent } from './BudgetBreakdownRowContent'

const Container = styled(BudgetBreakdownRowContent)`
  color: ${getColor('textShy')};
`

export const BudgetBreakdownHeader = () => {
  return (
    <Container>
      <div />
      <Text>Project</Text>
      <Text>Goal</Text>
      <Text>Budget</Text>
      <Text>Share</Text>
    </Container>
  )
}
