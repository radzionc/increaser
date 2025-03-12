import { Hoverable } from '@lib/ui/base/Hoverable'
import { OnClickProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { HabitItemContent } from './HabitItemContent'

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
