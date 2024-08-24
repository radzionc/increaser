import { Opener } from '@lib/ui/base/Opener'
import { CreateIdeaForm } from './form/CreateIdeaForm'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/layout/Stack'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useProjectFilter } from '../projects/filter/ProjectFilterProvider'

export const AddIdea = () => {
  const [projectId] = useProjectFilter()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button size="s" onClick={onOpen}>
          <HStack gap={8} alignItems="center">
            <PlusIcon />
            Add an idea
          </HStack>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateIdeaForm
            initialValue={projectId ? { projectId } : undefined}
            onFinish={onClose}
          />
        </PanelModal>
      )}
    />
  )
}
