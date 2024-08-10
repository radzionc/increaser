import { HStack } from '@lib/ui/layout/Stack'
import { formatTimeGrouping, timeGroupings } from './TimeGrouping'
import styled from 'styled-components'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { ShySection } from '@lib/ui/layout/ShySection'
import { useTrackedTimeReportPreferences } from './state/useTrackedTimeReportPreferences'

const Option = styled(TabNavigationItem)`
  height: 36px;
  font-size: 13px;
  ${horizontalPadding(12)};
`

export const TimeGroupSelector = () => {
  const [{ timeGrouping }, setState] = useTrackedTimeReportPreferences()

  return (
    <ShySection title="Group by">
      <HStack gap={4}>
        {timeGroupings.map((value) => (
          <Option
            isSelected={value === timeGrouping}
            onSelect={() =>
              setState((state) => ({ ...state, timeGrouping: value }))
            }
            value={value}
            key={value}
            groupName="timeGroup"
          >
            {formatTimeGrouping(value)}
          </Option>
        ))}
      </HStack>
    </ShySection>
  )
}
