import { FocusDurationInput } from '@increaser/app/focus/components/FocusDurationInput'
import { useFocus } from '@increaser/ui/focus/FocusContext'

export const FocusDurationPicker = () => {
  const { focusDuration, setFocusDuration } = useFocus()
  return (
    <FocusDurationInput value={focusDuration} onChange={setFocusDuration} />
  )
}
