import { useFocus } from '@increaser/ui/focus/FocusContext'
import { Switch } from '../../inputs/Switch'

export const FocusSoundNotifications = () => {
  const { hasTimerSoundNotification, setHasTimerSoundNotification } = useFocus()

  return (
    <Switch
      size="s"
      label="Sound notifications"
      onChange={setHasTimerSoundNotification}
      value={hasTimerSoundNotification}
    />
  )
}
