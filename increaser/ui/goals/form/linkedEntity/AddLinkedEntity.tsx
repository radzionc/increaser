import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { ClosableComponentProps } from '@lib/ui/props'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { ReactNode } from 'react'
import { LinkActionContainer } from './LinkActionContainer'
import { Text } from '@lib/ui/text'

type AddLinkedEntityProps = {
  renderCreateForm: (props: ClosableComponentProps) => ReactNode
}

export const AddLinkedEntity = ({ renderCreateForm }: AddLinkedEntityProps) => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <LinkActionContainer onClick={onOpen}>
          <PlusIcon />
          <Text>Add</Text>
        </LinkActionContainer>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          {renderCreateForm({
            onClose,
          })}
        </PanelModal>
      )}
    />
  )
}
