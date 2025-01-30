import { Button } from '../../buttons/Button'
import { HStack } from '../../css/stack'
import { NoDataIllustration } from '../../illustrations/NoDataIllustration'
import { Center } from '../../layout/Center'
import { ActionProp, OnRemoveProp, TitleProp } from '../../props'
import { Text } from '../../text'

type NoFilterMatchesProps = OnRemoveProp & TitleProp & ActionProp

export const NoFilterMatches = ({
  action,
  title,
  onRemove,
}: NoFilterMatchesProps) => {
  return (
    <Center gap={40}>
      <Text size={20} weight="700" color="contrast">
        {title}
      </Text>
      <NoDataIllustration fontSize={100} />
      <HStack gap={8} alignItems="center">
        {onRemove && (
          <Button size="s" kind="outlined" onClick={onRemove}>
            Clear filter
          </Button>
        )}
        {action}
      </HStack>
    </Center>
  )
}
