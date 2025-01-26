import { GroupedRadioInput } from '@lib/ui/inputs/GroupedRadioInput'
import { useBreakDuration } from './state/useBreakDuration'
import { breakDurations } from './BreakDuration'

export const ManageBreakDuration = () => {
  const [value, setValue] = useBreakDuration()

  if (!value) return null
  return (
    <GroupedRadioInput
      options={breakDurations.map((duration) => duration.toString())}
      renderOption={(option) => option}
      value={value.toString()}
      onChange={(value) => setValue(Number(value))}
    />
  )
}
