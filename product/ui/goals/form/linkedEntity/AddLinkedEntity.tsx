import { Opener } from '@lib/ui/base/Opener'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { OnCloseProp } from '@lib/ui/props'
import { ReactNode } from 'react'

import { LinkActionContainer } from './LinkActionContainer'

type AddLinkedEntityProps = {
  renderCreateForm: (props: OnCloseProp) => ReactNode
}

export const AddLinkedEntity = ({ renderCreateForm }: AddLinkedEntityProps) => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <LinkActionContainer onClick={onOpen}>
          <PrefixedItemFrame prefix={<PlusIcon />}>Add</PrefixedItemFrame>
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
