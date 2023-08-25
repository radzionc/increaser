import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { ComponentWithChildrenProps } from 'shared/props'
import styled from 'styled-components'

interface Props extends ComponentWithChildrenProps {
  name: string
}

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.mistExtra.toCssValue()};
`

export const NamedSection = ({ name, children }: Props) => {
  return (
    <VStack fullWidth gap={20}>
      <>
        <VStack fullWidth gap={4}>
          <Text color="shy" weight="semibold">
            {name}
          </Text>
          <Line />
        </VStack>
        {children}
      </>
    </VStack>
  )
}
