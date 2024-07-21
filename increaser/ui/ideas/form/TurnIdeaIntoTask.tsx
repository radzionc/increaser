import { Opener } from '@lib/ui/base/Opener'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { TaskFormOverlay } from '../../tasks/form/TaskFormOverlay'
import { CreateTaskForm } from '../../tasks/form/CreateTaskForm'
import { ComponentWithValueProps } from '@lib/ui/props'
import { IdeaFormShape } from './IdeaFormShape'
import { useDeleteIdeaMutation } from '../api/useDeleteIdeaMutation'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentIdea } from '../CurrentIdeaProvider'
import { EmbeddedPrompt } from '@lib/ui/buttons/EmbeddedPrompt'

export const TurnIdeaIntoTask = ({
  value,
}: ComponentWithValueProps<IdeaFormShape>) => {
  const { mutate: deleteIdea } = useDeleteIdeaMutation()
  const [, setActiveItemId] = useActiveItemId()
  const { id } = useCurrentIdea()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <EmbeddedPrompt icon={<CheckSquareIcon />} onClick={onOpen}>
          Turn into a task
        </EmbeddedPrompt>
      )}
      renderContent={({ onClose }) => (
        <TaskFormOverlay onFinish={onClose}>
          <CreateTaskForm
            defaultValue={{
              ...value,
              deadlineType: 'today',
            }}
            onFinish={(task) => {
              if (!task) {
                onClose()
              }
            }}
            onMutationFinish={() => {
              onClose()
              deleteIdea({ id })
              setActiveItemId(null)
            }}
          />
        </TaskFormOverlay>
      )}
    />
  )
}
