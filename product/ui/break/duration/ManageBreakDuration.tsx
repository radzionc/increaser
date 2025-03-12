import { GroupedRadioInput } from '@lib/ui/inputs/GroupedRadioInput'
import { usePresentState } from '@lib/ui/state/usePresentState'

import { breakDurations } from './BreakDuration'
import { useBreakDuration } from './state/useBreakDuration'

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
