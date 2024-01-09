import { useFocus } from '@increaser/ui/focus/FocusContext'
import { Switch } from '@lib/ui/inputs/Switch/Switch'

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
