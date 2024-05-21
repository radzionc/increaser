import { Opener } from '@lib/ui/base/Opener'

import { UpdateSetStartTimeOverlay } from './UpdateSetStartTimeOverlay'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { formatTime } from '@lib/utils/time/formatTime'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { ShyTextButton } from '@lib/ui/buttons/ShyTextButton'

export const SessionStartedAt = () => {
  const { currentSet: optionalCurrentSet, updateStartTime } = useFocus()
  const { startedAt } = shouldBeDefined(optionalCurrentSet)

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <LabeledValue name="Started at">
          <ShyTextButton onClick={onOpen} text={formatTime(startedAt)} />
        </LabeledValue>
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
