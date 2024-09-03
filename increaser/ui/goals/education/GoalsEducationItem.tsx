import { VStack } from '@lib/ui/css/stack'
import { ComponentWithChildrenProps, TitledComponentProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { SectionTitle } from '@lib/ui/text/SectionTitle'

type GoalsEducationItemProps = TitledComponentProps &
  ComponentWithChildrenProps & {
    index: number
  }

export const GoalsEducationItem = ({
  index,
  children,
  title,
}: GoalsEducationItemProps) => {
  return (
    <VStack gap={4}>
      <SectionTitle>
        <Text as="span" color="shy" style={{ marginRight: 8 }}>
          #{index + 1}
        </Text>
        {title}
      </SectionTitle>
      <Text height="large" size={14} weight="500" color="supporting">
        {children}
      </Text>
    </VStack>
  )
}
