import { Switch } from '@lib/ui/inputs/Switch'
import { useFocusLauncher } from '../state/FocusLauncherContext'

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
      label="Change session start time"
    />
  )
}
