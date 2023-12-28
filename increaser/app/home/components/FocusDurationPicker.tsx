import { FocusDurationInput } from '@increaser/app/focus/components/FocusDurationInput'
import { useFocus } from '@increaser/app/focus/hooks/useFocus'

export const FocusDurationPicker = () => {
  const { focusDuration, setFocusDuration } = useFocus()
  return (
    <FocusDurationInput value={focusDuration} onChange={setFocusDuration} />
  )
}
