import { FocusDurationInput } from '../components/FocusDurationInput'
import { useFocusLauncherDuration } from './state/FocusLauncherDurationProvider'

export const FocusLauncherDuration = () => {
  const [value, setValue] = useFocusLauncherDuration()

  return <FocusDurationInput value={value} onChange={setValue} />
}
