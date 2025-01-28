import { Opener } from '@lib/ui/base/Opener'
import { CreateTaskForm } from '../../tasks/form/CreateTaskForm'
import { ValueProp } from '@lib/ui/props'
import { IdeaFormShape } from './IdeaFormShape'
import { useCurrentIdea } from '../CurrentIdeaProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { productToolIconRecord } from '../../tools/productToolIconRecord'

export const TurnIdeaIntoTask = ({ value }: ValueProp<IdeaFormShape>) => {
  const { mutate: deleteIdea } = useDeleteUserEntityMutation('idea')
  const { id } = useCurrentIdea()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button kind="secondary" onClick={onOpen}>
          <HStack alignItems="center" gap={8}>
            <IconWrapper>{productToolIconRecord.tasks}</IconWrapper>
            Turn into a task
          </HStack>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateTaskForm
            initialValue={value}
            onFinish={(task) => {
              onClose()
              if (task) {
                deleteIdea(id)
              }
            }}
          />
        </PanelModal>
      )}
    />
  )
}
