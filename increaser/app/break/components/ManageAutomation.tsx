import { useBreak } from '@increaser/app/break/hooks/useBreak'
import { MinimalisticSwitch } from '@lib/ui/inputs/Switch/MinimalisticSwitch'

export const ManageAutomation = () => {
  const { hasAutomaticBreak, setHasAutomaticBreak } = useBreak()

  return (
    <MinimalisticSwitch
      label="Start break automatically"
      onChange={setHasAutomaticBreak}
      value={hasAutomaticBreak}
    />
  )
}
