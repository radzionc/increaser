import { Switch } from '@lib/ui/inputs/Switch'
import { useHasTimerSoundNotification } from '../hooks/useHasTimeSoundNotification'

export const FocusSoundNotifications = () => {
  const [hasTimerSoundNotification, setHasTimerSoundNotification] =
    useHasTimerSoundNotification()

  return (
    <Switch
      size="s"
      label="Sound notifications"
      onChange={setHasTimerSoundNotification}
      value={hasTimerSoundNotification}
    />
  )
}
