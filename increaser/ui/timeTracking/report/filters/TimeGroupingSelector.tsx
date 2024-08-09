import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { Text } from '@lib/ui/text'
import { formatTimeGrouping, timeGroupings } from '../TimeGrouping'
import { HStack } from '@lib/ui/layout/Stack'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { useId } from 'react'

export const TimeGroupingSelector = () => {
  const { timeGrouping, setState } = useTrackedTimeReport()
  const id = useId()

  return (
    <HStack gap={4}>
      {timeGroupings.map((value) => (
        <TabNavigationItem
          isSelected={value === timeGrouping}
          onSelect={() =>
            setState((state) => ({ ...state, timeGrouping: value }))
          }
          value={value}
          key={value}
          groupName={id}
        >
          <Text>{formatTimeGrouping(value)}</Text>
        </TabNavigationItem>
      ))}
    </HStack>
  )
}
