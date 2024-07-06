import { ReactNode } from 'react'
import { HStack } from '../../layout/Stack'
import { IconWrapper } from '../../icons/IconWrapper'
import { Text } from '../../text'
import { dropdownInputConfig } from './config'
import { textInputHorizontalPadding } from '../../css/textInput'

interface DropdownOptionContentProps {
  identifier: ReactNode
  name: ReactNode
}

export const DropdownOptionContent = ({
  identifier,
  name,
}: DropdownOptionContentProps) => (
  <HStack alignItems="center" gap={textInputHorizontalPadding}>
    <IconWrapper style={{ fontSize: dropdownInputConfig.identifierSize }}>
      {identifier}
    </IconWrapper>
    <Text as="div" cropped>
      {name}
    </Text>
  </HStack>
)
