import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { ReactNode } from 'react'

interface AuthViewProps extends ComponentWithChildrenProps {
  title: ReactNode
}

export const AuthView = ({ children, title }: AuthViewProps) => (
  <VStack alignItems="center" gap={40}>
    <Text color="contrast" weight="bold" size={24}>
      {title}
    </Text>
    {children}
  </VStack>
)
