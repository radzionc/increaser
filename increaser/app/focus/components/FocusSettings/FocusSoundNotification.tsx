import { Switch } from '@lib/ui/inputs/Switch'
import { useHasTimerBrowserNotification } from '@increaser/ui/focus/hooks/useHasTimerBrowserNotification'
import { useHasTimerSoundNotification } from '@increaser/ui/focus/hooks/useHasTimerSoundNotification'

export const FocusSoundNotification = () => {
  const [hasTimerBrowserNotification, setHasTimerSoundNotification] =
    useHasTimerBrowserNotification()
  const [hasTimerSoundNotification] = useHasTimerSoundNotification()

  if (!hasTimerBrowserNotification) return null

  return (
    <Switch
      size="s"
      label="sound"
      onChange={setHasTimerSoundNotification}
      value={hasTimerSoundNotification}
    />
  )
}
