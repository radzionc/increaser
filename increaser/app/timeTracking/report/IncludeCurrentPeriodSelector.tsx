import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { TimeGrouping } from './TimeGrouping'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { transition } from '@lib/ui/css/transition'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { HStack } from '@lib/ui/layout/Stack'
import { interactive } from '@lib/ui/css/interactive'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { Text } from '@lib/ui/text'

const currentPeriodName: Record<TimeGrouping, string> = {
  day: 'today',
  week: 'this week',
  month: 'this month',
}

const Container = styled(UnstyledButton)`
  ${borderRadius.s};
  outline: none;
  border: 1px solid ${getColor('mist')};
  padding: 8px 12px;
  background: ${getColor('foreground')};
  ${transition};

  align-items: center;
  gap: 4px;
  justify-content: space-between;

  font-size: 14px;

  ${interactive};

  &:hover {
    background: ${getHoverVariant('foreground')};
  }
`

const Check = styled.div<{ isActive?: boolean }>`
  ${round};
  border: 1px solid ${getColor('textShy')};
  background: ${matchColor('isActive', {
    true: 'primary',
    false: 'mist',
  })};
  ${sameDimensions(16)};
`

export const IncludeCurrentPeriodSelector = () => {
  const { includeCurrentPeriod, setState, timeGrouping } =
    useTrackedTimeReport()
  return (
    <Container
      onClick={() =>
        setState((state) => ({
          ...state,
          includeCurrentPeriod: !includeCurrentPeriod,
        }))
      }
    >
      <HStack fullWidth alignItems="center" justifyContent="space-between">
        <Text>Include {currentPeriodName[timeGrouping]}</Text>
        <Check isActive={includeCurrentPeriod} />
      </HStack>
    </Container>
  )
}
