import { useKeyDown } from '@lib/ui/hooks/useKeyDown'
import { isActiveElementEditable } from '@lib/ui/utils/isEditableElement'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useIsLikeMember } from '@product/app/membership/hooks/useIsLikeMember'

import { useCancelFocus } from './hooks/useCancelFocus'
import { useFocusTargetProject } from './hooks/useFocusTargetProject'
import { useStartFocus } from './hooks/useStartFocus'
import { useStopFocus } from './hooks/useStopFocus'
import { FocusInterval, useFocusIntervals } from './state/focusIntervals'

const StartFocusShortcut = () => {
  const project = useFocusTargetProject()
  const isLikeMember = useIsLikeMember()
  const startFocus = useStartFocus()

  useKeyDown(
    'Enter',
    () => {
      if (isActiveElementEditable()) return
      if (!project) return
      if (!isLikeMember) return

      startFocus({ start: Date.now() })
    },
    {
      shouldPreventDefault: true,
    },
  )

  return null
}

const StopFocusShortcut = ({ intervals }: { intervals: FocusInterval[] }) => {
  const stopFocus = useStopFocus()
  const cancelFocus = useCancelFocus()

  useKeyDown(
    'Enter',
    () => {
      if (isActiveElementEditable()) return

      const lastInterval = getLastItem(intervals)
      if (lastInterval.end !== null) return

      stopFocus()
    },
    {
      shouldPreventDefault: true,
    },
  )

  useKeyDown(
    'Backspace',
    () => {
      if (isActiveElementEditable()) return

      cancelFocus()
    },
    {
      shouldPreventDefault: true,
    },
  )

  return null
}

export const FocusKeyboardShortcuts = () => {
  const [intervals] = useFocusIntervals()

  if (intervals) {
    return <StopFocusShortcut intervals={intervals} />
  }

  return <StartFocusShortcut />
}
