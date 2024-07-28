import { Opener } from '@lib/ui/base/Opener'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { CreateTaskForm } from '../../tasks/form/CreateTaskForm'
import { ComponentWithValueProps } from '@lib/ui/props'
import { IdeaFormShape } from './IdeaFormShape'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentIdea } from '../CurrentIdeaProvider'
import { EmbeddedPrompt } from '@lib/ui/buttons/EmbeddedPrompt'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { PanelModal } from '@lib/ui/modal/PanelModal'

export const TurnIdeaIntoTask = ({
  value,
}: ComponentWithValueProps<IdeaFormShape>) => {
  const { mutate: deleteIdea } = useDeleteUserEntityMutation('idea')
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
        <PanelModal onFinish={onClose}>
          <CreateTaskForm
            defaultValue={value}
            onFinish={(task) => {
              if (!task) {
                onClose()
              }
            }}
            onMutationFinish={() => {
              onClose()
              deleteIdea(id)
              setActiveItemId(null)
            }}
          />
        </PanelModal>
      )}
    />
  )
}
