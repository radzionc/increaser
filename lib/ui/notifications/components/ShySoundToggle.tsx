import { useFocus } from '@increaser/ui/focus/FocusContext'
import { MinimalisticToggle } from '@lib/ui/inputs/MinimalisticToggle'

export const FocusSoundNotifications = () => {
  const { hasTimerSoundNotification, setHasTimerSoundNotification } = useFocus()

  return (
    <MinimalisticToggle
      label="Sound"
      onChange={setHasTimerSoundNotification}
      value={hasTimerSoundNotification}
    />
  )
}
