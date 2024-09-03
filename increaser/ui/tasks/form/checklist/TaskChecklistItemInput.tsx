import { TaskChecklistItem } from '@increaser/entities/Task'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { InputProps } from '@lib/ui/props'
import { ChecklistCheckbox } from './ChecklistCheckbox'
import { HStack } from '@lib/ui/css/stack'
import { ChecklistRemoveButton } from './ChecklistRemoveButton'
import { ChecklistItemNameInput } from './ChecklistItemNameInput'
import styled from 'styled-components'
import { CursorPosition } from '@lib/ui/entities/CursorPosition'

type TaskChecklistItemInputProps = InputProps<TaskChecklistItem> & {
  onRemove: () => void
  onSubmit?: (position: CursorPosition) => void
}

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
    <HStack fullWidth>
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
      <ChecklistRemoveButton onClick={onRemove} />
    </HStack>
  )
}
