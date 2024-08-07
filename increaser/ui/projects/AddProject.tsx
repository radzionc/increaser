import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { HStack } from '@lib/ui/layout/Stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { CreateProjectForm } from './form/CreateProjectForm'

export const AddProject = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Button size="s" onClick={onOpen}>
            <HStack alignItems="center" gap={8}>
              <IconWrapper>
                <PlusIcon />
              </IconWrapper>
              Add a project
            </HStack>
          </Button>
        )
      }
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateProjectForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
