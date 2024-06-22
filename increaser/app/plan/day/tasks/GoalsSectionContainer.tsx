import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { VStack } from '@lib/ui/layout/Stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

const Container = styled(VStack)`
  position: relative;
`

const Outline = styled.div`
  ${absoluteOutline(16, 8)};
  ${borderRadius.s};
  border: 2px dashed ${getColor('mistExtra')};
`

export const GoalsSectionContainer = ({
  children,
}: ComponentWithChildrenProps) => {
  const [activeItem] = useActiveItemId()
  return (
    <Container>
      {children}
      {!activeItem && <Outline />}
    </Container>
  )
}
