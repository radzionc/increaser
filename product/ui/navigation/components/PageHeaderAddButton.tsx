import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { OnClickProp, ValueProp } from '@lib/ui/props'

export const PageHeaderAddButton = ({
  onClick,
  value,
}: OnClickProp & ValueProp<string>) => {
  return (
    <Button onClick={onClick} size="s">
      <HStack gap={8} alignItems="center">
        <PlusIcon />
        Add {value}
      </HStack>
    </Button>
  )
}
