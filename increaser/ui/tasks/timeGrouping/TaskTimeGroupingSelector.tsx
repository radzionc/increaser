import { useTaskTimeGrouping } from './useTaskTimeGrouping'
import { taskTimeGroupings } from './TaskTimeGrouping'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { GroupedRadioInput } from '@lib/ui/inputs/GroupedRadionInput'

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
