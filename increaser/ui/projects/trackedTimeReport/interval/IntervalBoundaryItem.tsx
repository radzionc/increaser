import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { VStack } from '@lib/ui/css/stack'
import { GripVerticalIcon } from '@lib/ui/icons/GripVerticalIcon'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export type IntervalBoundaryStatus = 'idle' | 'hovered' | 'active'

type IntervalBoundaryItemProps = {
  status: IntervalBoundaryStatus
}

const Container = styled.div<IntervalBoundaryItemProps>`
  width: 20px;
  height: 28px;
  ${centerContent};
  ${borderRadius.s};
  border: 1px solid ${getColor('mistExtra')};
  font-size: 16px;
  color: ${getColor('contrast')};
  background: ${matchColor('status', {
    idle: 'background',
    hovered: 'foreground',
    active: 'primary',
  })};
`

export const IntervalBoundaryItem = ({ status }: IntervalBoundaryItemProps) => {
  return (
    <VStack fullHeight justifyContent="center">
      <Container status={status}>
        <GripVerticalIcon />
      </Container>
    </VStack>
  )
}
