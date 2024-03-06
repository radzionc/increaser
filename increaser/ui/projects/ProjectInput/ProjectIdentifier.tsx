import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'

const Container = styled.div`
  ${sameDimensions('1em')};
  ${centerContent};
`

export const ProjectIdentifier = ({ children }: ComponentWithChildrenProps) => (
  <Container>
    <Text size={18} color="contrast">
      {children}
    </Text>
  </Container>
)
