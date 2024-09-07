import { FocusDurationInput } from '../components/FocusDurationInput'
import { useFocusTargetDuration } from './state/FocusLauncherDurationProvider'

export const FocusLauncherDuration = () => {
  const [value, setValue] = useFocusTargetDuration()

  return <FocusDurationInput value={value} onChange={setValue} />
}
