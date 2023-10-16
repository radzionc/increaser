import { ClosableComponentProps } from '@increaser/ui/props'
import { BottomSlideOver } from '@increaser/ui/ui/BottomSlideOver'
import { Modal } from '@increaser/ui/modal'
import { ResponsiveView } from '@increaser/ui/ui/ResponsiveView'

import { SelectProjectList } from './SelectProjectList'

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
    <ResponsiveView
      small={() => (
        <BottomSlideOver onClose={onClose} title={title}>
          {content}
        </BottomSlideOver>
      )}
      normal={() => (
        <Modal title="Change project" onClose={onClose}>
          {content}
        </Modal>
      )}
    />
  )
}
