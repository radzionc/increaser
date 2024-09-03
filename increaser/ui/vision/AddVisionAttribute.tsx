import { Opener } from '@lib/ui/base/Opener'
import { CreateVisionAttributeForm } from './form/CreateVisionAttributeForm'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { PanelModal } from '@lib/ui/modal/PanelModal'

export const AddVisionAttribute = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button size="s" onClick={onOpen}>
          <HStack gap={8} alignItems="center">
            <PlusIcon />
            Add an aspiration
          </HStack>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateVisionAttributeForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
