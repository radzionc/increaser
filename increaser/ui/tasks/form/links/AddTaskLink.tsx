import { LinkIcon } from '@lib/ui/icons/LinkIcon'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { ValueFinishProps } from '@lib/ui/props'
import { TaskLink } from '@increaser/entities/Task'
import { Opener } from '@lib/ui/base/Opener'
import { AddTaskLinkOverlay } from './AddTaskLinkOverlay'

export const AddTaskLink = ({ onFinish }: ValueFinishProps<TaskLink>) => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <ExpandableSelectorContainer title="Add a link" onClick={onOpen}>
          <LinkIcon />
        </ExpandableSelectorContainer>
      )}
      renderContent={({ onClose }) => (
        <AddTaskLinkOverlay
          onFinish={(value) => {
            if (value) {
              onFinish(value)
            }
            onClose()
          }}
        />
      )}
    />
  )
}
