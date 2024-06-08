import { LabelText } from '@lib/ui/inputs/LabelText'
import { HStack } from '@lib/ui/layout/Stack'
import { ComponentWithChildrenProps } from '@lib/ui/props'

export const DeadlineInputContainer = ({
  children,
}: ComponentWithChildrenProps) => (
  <HStack alignItems="center" gap={16}>
    <LabelText>Achieve by</LabelText>
    {children}
  </HStack>
)
