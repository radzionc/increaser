import { ComponentWithChildrenProps } from '@lib/ui/props'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

interface LegalSectionProps extends ComponentWithChildrenProps {
  title: string
}

export const LegalSection = ({ title, children }: LegalSectionProps) => (
  <VStack gap={12}>
    <Text as="h2">{title}</Text>
    <Text>{children}</Text>
  </VStack>
)
