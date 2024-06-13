import { Opener } from '@lib/ui/base/Opener'

import { UpdateSetStartTimeOverlay } from './UpdateSetStartTimeOverlay'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { formatTime } from '@lib/utils/time/formatTime'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { ShyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const SessionStartedAt = () => {
  const { currentSet: optionalCurrentSet, updateStartTime } = useFocus()
  const { startedAt } = shouldBePresent(optionalCurrentSet)

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <LabeledValue labelColor="supporting" name="Started at">
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
