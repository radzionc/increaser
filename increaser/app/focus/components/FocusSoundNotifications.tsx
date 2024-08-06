import { Switch } from '@lib/ui/inputs/Switch'
import { useHasTimerSoundNotification } from '@increaser/ui/focus/hooks/useHasTimerSoundNotification'

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
