import { ReactNode } from 'react'

import { HStack } from '../layout/Stack'
import { Text, TextColor } from '.'

interface Props {
  name: ReactNode
  children: ReactNode
  labelColor?: TextColor
}

export const LabeledValue = ({ name, children, labelColor = 'shy' }: Props) => (
  <HStack gap={8} alignItems="center">
    <Text as="div" color={labelColor}>
      {name}:
    </Text>
    {children}
  </HStack>
)
