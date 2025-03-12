import { Opener } from '@lib/ui/base/Opener'
import { LinkIcon } from '@lib/ui/icons/LinkIcon'
import { OnFinishProp } from '@lib/ui/props'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { TaskLink } from '@product/entities/Task'

import { AddTaskLinkOverlay } from './AddTaskLinkOverlay'

export const AddTaskLink = ({ onFinish }: OnFinishProp<TaskLink>) => {
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
