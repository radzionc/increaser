import { FocusDurationInput } from 'focus/components/FocusDurationInput'
import { useFocus } from 'focus/hooks/useFocus'

export const FocusDurationPicker = () => {
  const { focusDuration, setFocusDuration } = useFocus()
  return (
    <FocusDurationInput value={focusDuration} onChange={setFocusDuration} />
  )
}
