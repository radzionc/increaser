import { ClickableComponentProps } from '@increaser/ui/props'
import { Center } from '@increaser/ui/ui/Center'
import { Hoverable } from '@increaser/ui/ui/Hoverable'
import { PlusIcon } from '@increaser/ui/icons/PlusIcon'
import { Text } from '@increaser/ui/ui/Text'
import { ChecklistItemFrame } from '@increaser/ui/ui/checklist/ChecklistItemFrame'

export const AddTaskButton = ({ onClick }: ClickableComponentProps) => {
  return (
    <Hoverable onClick={onClick}>
      <ChecklistItemFrame>
        <Center>
          <PlusIcon />
        </Center>
        <Text>Add task</Text>
      </ChecklistItemFrame>
    </Hoverable>
  )
}
