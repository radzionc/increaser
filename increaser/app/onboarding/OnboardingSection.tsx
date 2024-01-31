import { VStack } from '@lib/ui/layout/Stack'
import { ComponentWithChildrenProps, TitledComponentProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'

export const OnboardingSection = ({
  title,
  children,
}: ComponentWithChildrenProps & TitledComponentProps) => (
  <VStack fullHeight gap={28}>
    <Text as="div" size={20} color="contrast" weight="bold">
      {title}
    </Text>
    {children}
  </VStack>
)
