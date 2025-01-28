import { LinkIcon } from '@lib/ui/icons/LinkIcon'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { OnFinishValueProp } from '@lib/ui/props'
import { TaskLink } from '@increaser/entities/Task'
import { Opener } from '@lib/ui/base/Opener'
import { AddTaskLinkOverlay } from './AddTaskLinkOverlay'

export const AddTaskLink = ({ onFinish }: OnFinishValueProp<TaskLink>) => {
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
