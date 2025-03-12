import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { ValueProp } from '@lib/ui/props'

import { CreateTaskForm } from '../../tasks/form/CreateTaskForm'
import { productToolIconRecord } from '../../tools/productToolIconRecord'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useCurrentIdea } from '../CurrentIdeaProvider'

import { IdeaFormShape } from './IdeaFormShape'

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
