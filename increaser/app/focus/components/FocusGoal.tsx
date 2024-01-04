import { useFocus } from '@increaser/app/focus/hooks/useFocus'

import { UpdateFocusDurationOverlay } from './CurrentSetDuration'
import { Opener } from '@lib/ui/base/Opener'
import { ShyFocusButton } from './ShyFocusButton'
import { TargetIcon } from '@lib/ui/icons/TargetIcon'

export const FocusGoal = () => {
  const { focusDuration } = useFocus()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <ShyFocusButton icon={<TargetIcon />} onClick={onOpen}>
          {focusDuration} min
        </ShyFocusButton>
      )}
      renderContent={({ onClose }) => (
        <UpdateFocusDurationOverlay onClose={onClose} />
      )}
    />
  )
}
