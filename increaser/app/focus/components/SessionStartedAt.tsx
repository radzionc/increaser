import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import { Opener } from '@lib/ui/base/Opener'

import { UpdateSetStartTimeOverlay } from './UpdateSetStartTimeOverlay'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { formatTime } from '@lib/utils/time/formatTime'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { ShyFocusButton } from './ShyFocusButton'

export const SessionStartedAt = () => {
  const { currentSet: optionalCurrentSet, updateStartTime } = useFocus()
  const { startedAt } = shouldBeDefined(optionalCurrentSet)

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <ShyFocusButton onClick={onOpen} icon={<PlayIcon />}>
          {formatTime(startedAt)}
        </ShyFocusButton>
      )}
      renderContent={({ onClose }) => (
        <UpdateSetStartTimeOverlay
          onClose={onClose}
          onSubmit={(value) => {
            updateStartTime(value)
            onClose()
          }}
        />
      )}
    />
  )
}
