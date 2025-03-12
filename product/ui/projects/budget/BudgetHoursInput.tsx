import { InputProps } from '@lib/ui/props'
import { WithHint } from '@lib/ui/tooltips/WithHint'
import { HoursInput } from '@product/ui/weeklyGoals/HoursInput'

type BudgetHoursInputProps = InputProps<number | null> & {
  max: number
}

export const BudgetHoursInput = ({
  value,
  onChange,
  max,
}: BudgetHoursInputProps) => (
  <HoursInput
    label={
      <WithHint hint="Select the number of hours you aim to spend on this project each week.">
        Budget (optional)
      </WithHint>
    }
    placeholder="Enter hours"
    max={max}
    value={value}
    onChange={onChange}
  />
)
