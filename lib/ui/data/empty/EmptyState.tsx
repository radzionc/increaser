import { HStack } from '../../css/stack'
import { NoDataIllustration } from '../../illustrations/NoDataIllustration'
import { Center } from '../../layout/Center'
import { ActionProp, TitleProp } from '../../props'
import { Text } from '../../text'

type EmptyStateProps = TitleProp & ActionProp

export const EmptyState = ({ action, title }: EmptyStateProps) => {
  return (
    <Center gap={40}>
      <Text size={20} weight="700" color="contrast">
        {title}
      </Text>
      <NoDataIllustration fontSize={100} />
      <HStack gap={8} alignItems="center">
        {action}
      </HStack>
    </Center>
  )
}
