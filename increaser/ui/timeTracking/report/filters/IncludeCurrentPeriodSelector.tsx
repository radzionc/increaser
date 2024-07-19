import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { TimeGrouping } from '../TimeGrouping'
import styled from 'styled-components'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { HStack } from '@lib/ui/layout/Stack'
import { interactive } from '@lib/ui/css/interactive'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { Text } from '@lib/ui/text'
import { SelectContainer } from '@lib/ui/select/SelectContainer'

const currentPeriodName: Record<TimeGrouping, string> = {
  day: 'today',
  week: 'this week',
  month: 'this month',
  year: 'this year',
}

const Container = styled(SelectContainer)`
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
