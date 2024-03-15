import { ReactNode } from 'react'

import { HStack } from '../layout/Stack'
import { Text } from '.'

interface Props {
  name: ReactNode
  children: ReactNode
}

export const LabeledValue = ({ name, children }: Props) => (
  <HStack gap={8} alignItems="center">
    <Text as="div" color="shy">
      {name}:
    </Text>
    {children}
  </HStack>
)
