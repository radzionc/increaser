import styled from 'styled-components'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { IncreaserIcon } from './IncreaserIcon'

const Logo = styled(Text)`
  font-size: 0.68em;
`

export const ProductLogo = () => {
  return (
    <HStack alignItems="center" gap={8}>
      <IncreaserIcon />
      <Logo
        style={{ fontSize: '0.72em' }}
        color="contrast"
        weight="bold"
        height="small"
      >
        increaser
      </Logo>
    </HStack>
  )
}
