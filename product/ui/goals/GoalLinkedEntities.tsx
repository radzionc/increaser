import { VStack } from '@lib/ui/css/stack'
import { ChildrenProp, TitleProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'

export const GoalLinkedEntities: React.FC<ChildrenProp & TitleProp> = ({
  children,
  title,
}) => (
  <VStack gap={4}>
    <Text color="supporting" size={13}>
      {title}
    </Text>
    {children}
  </VStack>
)
