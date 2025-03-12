import { Match } from '@lib/ui/base/Match'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { range } from '@lib/utils/array/range'
import { WEEKDAYS } from '@lib/utils/time'
import { TaskCadence } from '@product/entities/TaskFactory'

type Props = InputProps<number | null> & {
  cadence: TaskCadence
}

export const TaskDeadlineIndexInput = ({ value, onChange, cadence }: Props) => {
  return (
    <Match
      value={cadence}
      day={() => null}
      workday={() => null}
      week={() => (
        <ExpandableSelector
          showToggle={false}
          value={value}
          onChange={onChange}
          options={range(7)}
          getOptionKey={(option) => WEEKDAYS[option]}
        />
      )}
      month={() => (
        <ExpandableSelector
          showToggle={false}
          value={value}
          onChange={onChange}
          options={range(31)}
          getOptionKey={(option) => `Day ${option + 1}`}
        />
      )}
    />
  )
}
