import { Opener } from '@lib/ui/base/Opener'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { CreateProjectForm } from './ProjectForm/CreateProejctForm'
import { CallOutPanel } from '@lib/ui/panel/CallOutPanel'

export const CreateProjectPrompt = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <CallOutPanel onClick={onOpen} kind="secondary">
            <HStack alignItems="center" gap={8}>
              <IconWrapper>
                <PlusIcon />
              </IconWrapper>
              Add project
            </HStack>
          </CallOutPanel>
        )
      }
      renderContent={({ onClose }) => <CreateProjectForm onFinish={onClose} />}
    />
  )
}
