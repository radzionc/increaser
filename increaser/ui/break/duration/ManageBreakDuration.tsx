import { GroupedRadioInput } from '@lib/ui/inputs/GroupedRadioInput'
import { useBreakDuration } from './state/useBreakDuration'
import { breakDurations } from './BreakDuration'
import { usePresentState } from '@lib/ui/state/usePresentState'

export const ManageBreakDuration = () => {
  const [value, setValue] = usePresentState(useBreakDuration())

  return (
    <GroupedRadioInput
      options={breakDurations.map((duration) => duration.toString())}
      renderOption={(option) => option}
      value={value.toString()}
      onChange={(value) => setValue(Number(value))}
    />
  )
}
