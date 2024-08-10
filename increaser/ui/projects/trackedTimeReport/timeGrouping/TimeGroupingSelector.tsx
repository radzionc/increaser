import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { ShySection } from '@lib/ui/layout/ShySection'
import { useTimeGrouping } from './useTimeGrouping'
import { formatTimeGrouping, timeGroupings } from './TimeGrouping'

const Option = styled(TabNavigationItem)`
  height: 36px;
  font-size: 13px;
  ${horizontalPadding(12)};
`

export const TimeGroupingSelector = () => {
  const [value, setValue] = useTimeGrouping()

  return (
    <ShySection title="Group by">
      <HStack gap={4}>
        {timeGroupings.map((option) => (
          <Option
            isSelected={value === option}
            onSelect={() => setValue(option)}
            value={value}
            key={value}
            groupName="timeGroup"
          >
            {formatTimeGrouping(option)}
          </Option>
        ))}
      </HStack>
    </ShySection>
  )
}
