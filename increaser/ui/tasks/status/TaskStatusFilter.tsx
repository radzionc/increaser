import { TaskStatus, taskStatuses } from '@increaser/entities/Task'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { useId } from 'react'
import { taskStatusIcon } from './taskStatusIcon'

export const {
  provider: TaskStatusFilterProvider,
  useState: useTaskStatusFilter,
} = getStateProviderSetup<TaskStatus>('TaskStatusFilter')

export const TaskStatusFilter = () => {
  const [status, setStatus] = useTaskStatusFilter()
  const id = useId()

  return (
    <HStack gap={4}>
      {taskStatuses.map((value) => (
        <TabNavigationItem
          isSelected={value === status}
          onSelect={() => setStatus(value)}
          value={value}
          key={value}
          groupName={id}
        >
          <HStack alignItems="center" gap={8}>
            <IconWrapper>{taskStatusIcon[value]}</IconWrapper>
            <Text>{capitalizeFirstLetter(value)}</Text>
          </HStack>
        </TabNavigationItem>
      ))}
    </HStack>
  )
}
