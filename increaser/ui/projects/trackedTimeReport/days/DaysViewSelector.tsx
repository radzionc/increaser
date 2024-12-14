import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { GroupedRadioInput } from '@lib/ui/inputs/GroupedRadioInput'
import { daysViews, useDaysView } from './state/daysView'

export const DaysViewSelector = () => {
  const [value, setValue] = useDaysView()

  return (
    <GroupedRadioInput
      options={daysViews}
      renderOption={(option) => capitalizeFirstLetter(option)}
      value={value}
      onChange={setValue}
    />
  )
}
