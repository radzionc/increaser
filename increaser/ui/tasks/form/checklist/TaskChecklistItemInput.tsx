import { TaskChecklistItem } from '@increaser/entities/Task'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { InputProps } from '@lib/ui/props'
import { ChecklistCheckbox } from './ChecklistCheckbox'
import { HStack } from '@lib/ui/layout/Stack'
import { ChecklistRemoveButton } from './ChecklistRemoveButton'
import { ChecklistItemNameInput } from './ChecklistItemNameInput'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

export type TaskChecklistItemInputProps = InputProps<TaskChecklistItem> & {
  onRemove: () => void
  onSubmit?: () => void
}

const Container = styled(ChecklistItemFrame)`
  background: ${getColor('background')};
  align-items: start;
`

export const TaskChecklistItemInput = ({
  value,
  onChange,
  onRemove,
  onSubmit,
}: TaskChecklistItemInputProps) => {
  return (
    <Container>
      <ChecklistCheckbox
        value={value.completed}
        onChange={() => onChange({ ...value, completed: !value.completed })}
      />
      <HStack fullWidth gap={8}>
        <ChecklistItemNameInput
          value={value.name}
          onChange={(name) => onChange({ ...value, name })}
          onSubmit={onSubmit}
        />
        <ChecklistRemoveButton onClick={onRemove} />
      </HStack>
    </Container>
  )
}
