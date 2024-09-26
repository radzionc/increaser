import { HStack, VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { useTimeGrouping } from './useTimeGrouping'
import { formatTimeGrouping, timeGroupings } from './TimeGrouping'
import { InputLabel } from '@lib/ui/inputs/InputLabel'

const Option = styled(TabNavigationItem)`
  height: 36px;
  font-size: 13px;
  ${horizontalPadding(12)};
`

export const TimeGroupingSelector = () => {
  const [value, setValue] = useTimeGrouping()

  return (
    <VStack gap={8}>
      <InputLabel>Group by</InputLabel>
      <HStack gap={4}>
        {timeGroupings.map((option) => (
          <Option
            isSelected={value === option}
            onSelect={() => setValue(option)}
            value={option}
            key={option}
            groupName="timeGroup"
          >
            {formatTimeGrouping(option)}
          </Option>
        ))}
      </HStack>
    </VStack>
  )
}
