import { Opener } from '@lib/ui/base/Opener'
import { interactive } from '@lib/ui/css/interactive'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { TaskFormOverlay } from '../../tasks/form/TaskFormOverlay'
import { CreateTaskForm } from '../../tasks/form/CreateTaskForm'
import { ComponentWithValueProps } from '@lib/ui/props'
import { NoteFormShape } from './NoteFormShape'
import { useDeleteNoteMutation } from '../api/useDeleteNoteMutation'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentNote } from '../CurrentNoteProvider'

const Container = styled.div`
  ${interactive};
  ${verticalPadding(12)};

  &:hover {
    background: ${getColor('foreground')};
    color: ${getColor('contrast')};
  }
`

export const TurnNoteIntoTask = ({
  value,
}: ComponentWithValueProps<NoteFormShape>) => {
  const { mutate: deleteNote } = useDeleteNoteMutation()
  const [, setActiveItemId] = useActiveItemId()
  const { id } = useCurrentNote()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container onClick={onOpen}>
          <PrefixedItemFrame prefix={<CheckSquareIcon />}>
            Turn into a task
          </PrefixedItemFrame>
        </Container>
      )}
      renderContent={({ onClose }) => (
        <TaskFormOverlay onFinish={onClose}>
          <CreateTaskForm
            defaultValue={value}
            deadlineType="today"
            onFinish={(task) => {
              if (!task) {
                onClose()
              }
            }}
            onMutationFinish={() => {
              onClose()
              deleteNote({ id })
              setActiveItemId(null)
            }}
          />
        </TaskFormOverlay>
      )}
    />
  )
}
