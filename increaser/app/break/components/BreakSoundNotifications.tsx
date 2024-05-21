import { useBreak } from '@increaser/app/break/hooks/useBreak'
import { MinimalisticSwitch } from '@lib/ui/inputs/Switch/MinimalisticSwitch'

export const BreakSoundNotification = () => {
  const { hasSoundNotification, setHasSoundNotification } = useBreak()

  return (
    <MinimalisticSwitch
      label="Sound notifications"
      onChange={setHasSoundNotification}
      value={hasSoundNotification}
    />
  )
}
