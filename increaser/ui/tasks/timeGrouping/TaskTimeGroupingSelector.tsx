import { HStack } from '@lib/ui/layout/Stack'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { useTaskTimeGrouping } from './useTaskTimeGrouping'
import { formatTaskTimeGrouping, taskTimeGroupings } from './TaskTimeGrouping'

export const TaskTimeGroupingSelector = () => {
  const [value, setValue] = useTaskTimeGrouping()

  return (
    <HStack gap={4}>
      {taskTimeGroupings.map((option) => (
        <TabNavigationItem
          isSelected={value === option}
          onSelect={() => setValue(option)}
          value={option}
          key={option}
          groupName="timeGroup"
        >
          {formatTaskTimeGrouping(option)}
        </TabNavigationItem>
      ))}
    </HStack>
  )
}
