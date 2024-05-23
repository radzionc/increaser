import { useBreak } from '@increaser/app/break/hooks/useBreak'
import { Switch } from '@lib/ui/inputs/Switch'

export const ManageAutomation = () => {
  const { hasAutomaticBreak, setHasAutomaticBreak } = useBreak()

  return (
    <Switch
      size="s"
      label="Start break automatically"
      onChange={setHasAutomaticBreak}
      value={hasAutomaticBreak}
    />
  )
}
