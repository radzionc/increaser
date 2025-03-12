import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ChildrenProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

type FocusOptionContentProps = ChildrenProp & {
  prefix: React.ReactNode
}

const Prefix = styled(IconWrapper)`
  color: ${getColor('contrast')};
`

export const FocusOptionContent = ({
  children,
  prefix,
}: FocusOptionContentProps) => (
  <HStack style={{ maxWidth: '100%' }} alignItems="center" gap={8}>
    <Prefix>{prefix}</Prefix>
    <Text cropped>{children}</Text>
  </HStack>
)
