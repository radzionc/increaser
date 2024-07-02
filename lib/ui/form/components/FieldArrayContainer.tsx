import { VStack } from '@lib/ui/layout/Stack'
import { ComponentWithChildrenProps, TitledComponentProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'

const Container = styled(VStack)`
  gap: 16px;
  overflow-y: auto;
`

export const FieldArrayContainer = ({
  title,
  children,
}: ComponentWithChildrenProps & TitledComponentProps) => (
  <Container gap={16}>
    <Text size={14} weight="semibold">
      {title}
    </Text>
    {children}
  </Container>
)
