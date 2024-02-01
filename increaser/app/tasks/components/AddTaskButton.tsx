import { ClickableComponentProps } from '@lib/ui/props'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { Text } from '@lib/ui/text'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { Hoverable } from '@lib/ui/base/Hoverable'
import styled from 'styled-components'
import { centerContent } from '@lib/ui/css/centerContent'

const IconContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  ${centerContent};
`

export const AddTaskButton = ({ onClick }: ClickableComponentProps) => {
  return (
    <Hoverable verticalOffset={0} onClick={onClick}>
      <ChecklistItemFrame>
        <IconContainer>
          <PlusIcon />
        </IconContainer>
        <Text>Add task</Text>
      </ChecklistItemFrame>
    </Hoverable>
  )
}
