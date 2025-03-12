import { GroupedRadioInput } from '@lib/ui/inputs/GroupedRadioInput'

import {
  useGoalsTimelineType,
  goalTimelineTypes,
  goalTimelineName,
} from './state/goalsTimelineType'

export const ManageGoalsTimelineType = () => {
  const [value, setValue] = useGoalsTimelineType()

  return (
    <GroupedRadioInput
      options={goalTimelineTypes}
      renderOption={(option) => goalTimelineName[option]}
      value={value}
      onChange={(type) => setValue(type)}
    />
  )
}
