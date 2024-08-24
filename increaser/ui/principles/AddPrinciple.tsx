import { Opener } from '@lib/ui/base/Opener'
import { CreatePrincipleForm } from './form/CreatePrincipleForm'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/layout/Stack'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { PanelModal } from '@lib/ui/modal/PanelModal'

export const AddPrinciple = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button size="s" onClick={onOpen}>
          <HStack gap={8} alignItems="center">
            <PlusIcon />
            Add a principle
          </HStack>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreatePrincipleForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
