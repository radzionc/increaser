import { GroupedRadioInput } from '@lib/ui/inputs/GroupedRadioInput'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'

import { taskTimeGroupings } from './TaskTimeGrouping'
import { useTaskTimeGrouping } from './useTaskTimeGrouping'

export const TaskTimeGroupingSelector = () => {
  const [value, setValue] = useTaskTimeGrouping()

  return (
    <GroupedRadioInput
      options={taskTimeGroupings}
      renderOption={(option) => `${capitalizeFirstLetter(option)}s`}
      value={value}
      onChange={(goal) => setValue(goal)}
    />
  )
}
