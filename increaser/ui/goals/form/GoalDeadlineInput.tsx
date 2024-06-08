import { Switch } from '@lib/ui/inputs/Switch'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { InputProps } from '@lib/ui/props'
import styled from 'styled-components'
import { addYears } from 'date-fns'
import { DayInput } from '@lib/ui/time/DayInput'
import { dayToString, stringToDay, toDay } from '@lib/utils/time/Day'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

const Container = styled(VStack)`
  padding: 0;
  > * {
    padding: ${toSizeUnit(panelDefaultPadding)};
  }
`

const Header = styled(HStack)`
  padding: 0;

  width: 100%;
  > * {
    &:first-child {
      flex: 1;
    }
  }

  > * {
    padding: ${toSizeUnit(panelDefaultPadding)};
  }
`

const getDefaultDeadline = () => addYears(Date.now(), 1).getTime()

const getMinDeadline = () => Date.now()
const getMaxDeadline = () => addYears(Date.now(), 50).getTime()

export const GoalDeadlineInput = ({
  value,
  onChange,
}: InputProps<string | null>) => {
  return (
    <Container>
      <Header>
        <Switch
          value={value !== null}
          size="s"
          label="Set deadline"
          onChange={(value) =>
            onChange(value ? dayToString(toDay(getDefaultDeadline())) : null)
          }
        />
      </Header>
      {value && (
        <DayInput
          min={toDay(getMinDeadline())}
          max={toDay(getMaxDeadline())}
          value={stringToDay(value)}
          onChange={(value) => onChange(dayToString(value))}
        />
      )}
    </Container>
  )
}
