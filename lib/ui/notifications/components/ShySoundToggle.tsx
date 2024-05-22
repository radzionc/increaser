import { useFocus } from '@increaser/ui/focus/FocusContext'
import { MinimalisticSwitch } from '../../inputs/Switch/MinimalisticSwitch'

export const FocusSoundNotifications = () => {
  const { hasTimerSoundNotification, setHasTimerSoundNotification } = useFocus()

  return (
    <MinimalisticSwitch
      label="Sound notifications"
      onChange={setHasTimerSoundNotification}
      value={hasTimerSoundNotification}
    />
  )
}
