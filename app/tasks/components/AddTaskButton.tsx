import { ClickableComponentProps } from '@increaser/ui/props'
import { Center } from '@increaser/ui/layout/Center'
import { PlusIcon } from '@increaser/ui/icons/PlusIcon'
import { Text } from '@increaser/ui/text'
import { ChecklistItemFrame } from '@increaser/ui/checklist/ChecklistItemFrame'
import { Hoverable } from '@increaser/ui/base/Hoverable'

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
