import { WithHint } from '@lib/ui/tooltips/WithHint'
import { HoursInput } from '@increaser/ui/weeklyGoals/HoursInput'
import { InputProps } from '@lib/ui/props'

type BudgetHoursInputProps = InputProps<number | null> & {
  max: number
}

export const BudgetHoursInput = ({
  value,
  onChange,
  max,
}: BudgetHoursInputProps) => (
  <HoursInput
    autoFocus
    label={
      <WithHint hint="Select the number of hours you aim to spend on this project each week.">
        Budget
      </WithHint>
    }
    placeholder="Enter hours"
    max={max}
    value={value}
    onChange={onChange}
  />
)
