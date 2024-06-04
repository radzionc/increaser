import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { Switch } from '@lib/ui/inputs/Switch'
import { VStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { InputProps } from '@lib/ui/props'
import styled from 'styled-components'
import { addYears } from 'date-fns'
import { DayInput } from '@lib/ui/time/DayInput'
import { fromDay, toDay } from '@lib/utils/time/Day'

const Container = styled(VStack)`
  ${horizontalPadding(0)};
  gap: 20px;
  > * {
    ${horizontalPadding(panelDefaultPadding)};
  }
`

const getDefaultDeadline = () => addYears(Date.now(), 1).getTime()

const getMinDeadline = () => Date.now()
const getMaxDeadline = () => addYears(Date.now(), 50).getTime()

export const GoalDeadlineInput = ({
  value,
  onChange,
}: InputProps<number | null>) => {
  return (
    <Container>
      <Switch
        value={value !== null}
        size="s"
        label="Set deadline"
        onChange={(value) => onChange(value ? getDefaultDeadline() : null)}
      />
      {value && (
        <DayInput
          min={toDay(getMinDeadline())}
          max={toDay(getMaxDeadline())}
          value={toDay(value)}
          onChange={(value) => onChange(fromDay(value))}
        />
      )}
    </Container>
  )
}
