import { TitledComponentProps, ComponentWithChildrenProps } from '../props'
import { VStack } from './Stack'
import { Text } from '../text'

type ShySectionProps = TitledComponentProps & ComponentWithChildrenProps

export const ShySection = ({ title, children }: ShySectionProps) => {
  return (
    <VStack gap={8}>
      <Text size={13} weight="bold" color="supporting">
        {title}
      </Text>
      {children}
    </VStack>
  )
}
