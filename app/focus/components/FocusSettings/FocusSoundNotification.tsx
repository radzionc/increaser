import { useFocus } from 'focus/hooks/useFocus'
import { Switch } from '@increaser/ui/inputs/Switch/Switch'

export const FocusSoundNotification = () => {
  const {
    hasTimerSoundNotification,
    setHasTimerSoundNotification,
    hasTimerBrowserNotification,
  } = useFocus()

  if (!hasTimerBrowserNotification) return null

  return (
    <Switch
      label="sound"
      onChange={setHasTimerSoundNotification}
      value={hasTimerSoundNotification}
    />
  )
}
