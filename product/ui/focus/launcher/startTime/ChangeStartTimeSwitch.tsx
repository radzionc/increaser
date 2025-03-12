import { Switch } from '@lib/ui/inputs/Switch'
import { WithHint } from '@lib/ui/tooltips/WithHint'

import { useFocusTargetStartTime } from '../state/FocusLauncherStartTimeProvider'

export const ChangeStartTimeSwitch = () => {
  const [value, setValue] = useFocusTargetStartTime()

  return (
    <Switch
      value={!!value}
      onChange={(value) => setValue(value ? Date.now() : null)}
      size="s"
      label={
        <WithHint hint="Adjust the session start time if you forgot to begin the focus session on time. This ensures accurate tracking for your tasks and projects">
          Change session start time
        </WithHint>
      }
    />
  )
}
