import { Switch } from '@lib/ui/inputs/Switch'
import { useFocusLauncher } from '../state/FocusLauncherContext'
import { WithHint } from '@lib/ui/tooltips/WithHint'

export const ChangeStartTimeSwitch = () => {
  const { setState, startedAt } = useFocusLauncher()

  return (
    <Switch
      value={!!startedAt}
      onChange={(value) =>
        setState((state) => ({
          ...state,
          startedAt: value ? Date.now() : null,
        }))
      }
      size="s"
      label={
        <WithHint hint="Adjust the session start time if you forgot to begin the focus session on time. This ensures accurate tracking for your tasks and projects">
          Change session start time
        </WithHint>
      }
    />
  )
}
