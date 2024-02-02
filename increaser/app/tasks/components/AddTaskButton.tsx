import { ClickableComponentProps } from '@lib/ui/props'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { Text } from '@lib/ui/text'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { Hoverable } from '@lib/ui/base/Hoverable'
import styled from 'styled-components'
import { centerContent } from '@lib/ui/css/centerContent'
import { getColor } from '@lib/ui/theme/getters'
import { transition } from '@lib/ui/css/transition'

const IconContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  ${centerContent};
  color: ${getColor('primary')};
`

const Container = styled(Hoverable)`
  color: ${getColor('textShy')};
  ${transition};
  &:hover {
    color: ${getColor('primary')};
  }
`

export const AddTaskButton = ({ onClick }: ClickableComponentProps) => {
  return (
    <Container verticalOffset={0} onClick={onClick}>
      <ChecklistItemFrame>
        <IconContainer>
          <PlusIcon />
        </IconContainer>
        <Text size={14} weight="regular">
          Add task
        </Text>
      </ChecklistItemFrame>
    </Container>
  )
}
