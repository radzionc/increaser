import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { centerContent } from '@lib/ui/css/centerContent'
import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CursorPosition } from '@lib/ui/entities/CursorPosition'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import { InputProps } from '@lib/ui/props'
import { TaskChecklistItem } from '@product/entities/Task'
import styled from 'styled-components'

import { ChecklistCheckbox } from './ChecklistCheckbox'
import { ChecklistItemNameInput } from './ChecklistItemNameInput'
import { ChecklistRemoveButton } from './ChecklistRemoveButton'

type TaskChecklistItemInputProps = InputProps<TaskChecklistItem> & {
  onRemove: () => void
  onSubmit?: (position: CursorPosition) => void
}

const ButtonWrapper = styled.div`
  height: ${toSizeUnit(tightListItemMinHeight)};
  ${centerContent}

  @media (hover: hover) and (pointer: fine) {
    opacity: 0;
  }
`

const Wrapper = styled(HStack)`
  width: 100%;

  &:hover ${ButtonWrapper} {
    opacity: 1;
  }
`

const Container = styled(ChecklistItemFrame)`
  align-items: start;
  flex: 1;
`

export const TaskChecklistItemInput = ({
  value,
  onChange,
  onRemove,
  onSubmit,
}: TaskChecklistItemInputProps) => {
  return (
    <Wrapper>
      <Container>
        <ChecklistCheckbox
          value={value.completed}
          onChange={() => onChange({ ...value, completed: !value.completed })}
        />
        <ChecklistItemNameInput
          value={value.name}
          onChange={(name) => onChange({ ...value, name })}
          onSubmit={onSubmit}
          onRemove={onRemove}
        />
      </Container>
      <ButtonWrapper>
        <ChecklistRemoveButton onClick={onRemove} />
      </ButtonWrapper>
    </Wrapper>
  )
}
