import { Text } from '@lib/ui/text'
import { BreakdownRowContent } from './BreakdownRowContent'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(BreakdownRowContent)`
  color: ${getColor('textShy')};
`

export const BreakdownHeader = () => {
  const { timeGrouping } = useTrackedTimeReport()

  return (
    <Container>
      <div />
      <Text>Project</Text>
      <Text>Total</Text>
      <Text>Avg. {timeGrouping}</Text>
      <Text>Share</Text>
    </Container>
  )
}
