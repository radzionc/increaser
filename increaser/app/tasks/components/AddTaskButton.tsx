import { ClickableComponentProps } from '@lib/ui/props'
import { Center } from '@lib/ui/layout/Center'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { Text } from '@lib/ui/text'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { Hoverable } from '@lib/ui/base/Hoverable'

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
