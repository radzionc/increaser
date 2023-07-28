import styled from 'styled-components'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
`

export const OptionsDivider = () => {
  return (
    <HStack alignItems="center" fullWidth gap={8}>
      <Line />
      <Text style={{ lineHeight: 1 }} color="supporting">
        or
      </Text>
      <Line />
    </HStack>
  )
}
