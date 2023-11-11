import { ReactNode } from 'react'
import { textInputPadding } from '../../css/textInput'
import { IconWrapper } from '../../icons/IconWrapper'
import { identifierSize } from './config'
import { HStack } from '../../ui/Stack'
import { Text } from '../../ui/Text'

interface OptionContentProps {
  identifier: ReactNode
  name: ReactNode
}

export const OptionContent = ({ identifier, name }: OptionContentProps) => (
  <HStack alignItems="center" gap={textInputPadding}>
    <IconWrapper style={{ fontSize: identifierSize }}>{identifier}</IconWrapper>
    <Text cropped>{name}</Text>
  </HStack>
)
