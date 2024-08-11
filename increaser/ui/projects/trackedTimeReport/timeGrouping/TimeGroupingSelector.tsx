import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { useTimeGrouping } from './useTimeGrouping'
import { formatTimeGrouping, timeGroupings } from './TimeGrouping'
import { LabelText } from '@lib/ui/inputs/LabelText'

const Option = styled(TabNavigationItem)`
  height: 36px;
  font-size: 13px;
  ${horizontalPadding(12)};
`

export const TimeGroupingSelector = () => {
  const [value, setValue] = useTimeGrouping()

  return (
    <VStack gap={8}>
      <LabelText>Group by</LabelText>
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
