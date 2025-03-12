import { Switch } from '@lib/ui/inputs/Switch'
import { WithHint } from '@lib/ui/tooltips/WithHint'

import { useHasAutoBreak } from '../state/hasAutoBreak'

export const info = `When enabled, breaks will start automatically after each work session, based on the duration you select. Automatic breaks won't start if the total work time exceeds 90 minutes, aligning with the recommended 90-minute productivity blocks for optimal focus and efficiency.`

export const AutoBreakPreference = () => {
  const [value, setValue] = useHasAutoBreak()

  return (
    <Switch
      label={<WithHint hint={info}>Enable automatic breaks</WithHint>}
      size="s"
      value={value}
      onChange={setValue}
    />
  )
}
