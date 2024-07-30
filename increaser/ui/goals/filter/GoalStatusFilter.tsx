import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useGoalStatusFilter } from './useGoalStatusFilter'
import { goalStatuses } from '@increaser/entities/Goal'

export const GoalStatusFilter = () => {
  const [value, setValue] = useGoalStatusFilter()

  return (
    <ExpandableSelector
      style={{ width: 142 }}
      value={value}
      onChange={setValue}
      options={[...goalStatuses, null]}
      getOptionKey={(option) => option.toString()}
      getOptionName={getOptionName}
      renderOption={getOptionName}
    />
  )
}
