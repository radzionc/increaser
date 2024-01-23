import { ClosableComponentProps } from '@lib/ui/props'
import { BottomSlideOver } from '@lib/ui/modal/BottomSlideOver'
import { Modal } from '@lib/ui/modal'

import { SelectProjectList } from './SelectProjectList'
import { BasedOnScreenWidth } from '@lib/ui/layout/BasedOnScreenWidth'

interface Props extends ClosableComponentProps {
  onSubmit: (projectId: string) => void
  initialValue: string
}

const title = 'Change project'

export const ChangeProjectOverlay = ({
  onClose,
  onSubmit,
  initialValue,
}: Props) => {
  const content = (
    <SelectProjectList
      value={initialValue}
      onSelect={(value) => {
        onSubmit(value)
        onClose()
      }}
    />
  )

  return (
    <BasedOnScreenWidth
      value={600}
      less={() => (
        <BottomSlideOver onClose={onClose} title={title}>
          {content}
        </BottomSlideOver>
      )}
      more={() => (
        <Modal title="Change project" onClose={onClose}>
          {content}
        </Modal>
      )}
    />
  )
}
