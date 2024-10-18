import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { HabitItemContent } from './HabitItemContent'
import { ClickableComponentProps } from '@lib/ui/props'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const HabitItem = ({ onClick }: ClickableComponentProps) => {
  return (
    <Container onClick={onClick} verticalOffset={0}>
      <HabitItemContent />
    </Container>
  )
}
