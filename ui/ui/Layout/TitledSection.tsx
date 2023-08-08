import { ReactNode } from 'react'
import { VStack } from '../Stack'
import { Text } from '../Text'
import { ComponentWithChildrenProps } from '../../shared/props'

interface Props extends ComponentWithChildrenProps {
  title: ReactNode
}

export const TitledSection = ({ title, children }: Props) => (
  <VStack gap={20}>
    <Text as="div" size={18} weight="bold" color="supporting">
      {title}
    </Text>
    {children}
  </VStack>
)
