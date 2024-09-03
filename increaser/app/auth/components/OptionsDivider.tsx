import styled from 'styled-components'
import { HStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'

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
