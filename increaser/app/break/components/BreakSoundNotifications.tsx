import { useBreak } from '@increaser/app/break/hooks/useBreak'
import { Switch } from '@lib/ui/inputs/Switch'

export const BreakSoundNotification = () => {
  const { hasSoundNotification, setHasSoundNotification } = useBreak()

  return (
    <Switch
      size="s"
      label="Sound notifications"
      onChange={setHasSoundNotification}
      value={hasSoundNotification}
    />
  )
}
