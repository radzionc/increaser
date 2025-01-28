import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { HabitItemContent } from './HabitItemContent'
import { OnClickProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
  color: ${getColor('contrast')};
`

export const HabitItem = ({ onClick }: OnClickProp) => {
  return (
    <Container onClick={onClick} verticalOffset={0}>
      <HabitItemContent />
    </Container>
  )
}
