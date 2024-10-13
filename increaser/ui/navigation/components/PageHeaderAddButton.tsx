import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { ClickableComponentProps, ComponentWithValueProps } from '@lib/ui/props'

export const PageHeaderAddButton = ({
  onClick,
  value,
}: ClickableComponentProps & ComponentWithValueProps<string>) => {
  return (
    <Button onClick={onClick} size="s">
      <HStack gap={8} alignItems="center">
        <PlusIcon />
        Add {value}
      </HStack>
    </Button>
  )
}
