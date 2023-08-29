import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

interface LegalSectionProps extends ComponentWithChildrenProps {
  title: string
}

export const LegalSection = ({ title, children }: LegalSectionProps) => (
  <VStack gap={12}>
    <Text as="h2">{title}</Text>
    <Text>{children}</Text>
  </VStack>
)
