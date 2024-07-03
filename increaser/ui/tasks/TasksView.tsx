import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ListIcon } from '@lib/ui/icons/ListIcon'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { SquareIcon } from '@lib/ui/icons/SquareIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { Text } from '@lib/ui/text'
import { getViewSetup } from '@lib/ui/view/getViewSetup'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { ReactNode, useId } from 'react'

export const tasksView = ['todo', 'backlog', 'done', 'recurring'] as const
export type TasksView = (typeof tasksView)[number]

export const tasksViewName: Record<TasksView, string> = {
  todo: 'To Do',
  done: 'Done',
  recurring: 'Recurring',
  backlog: 'Backlog',
}

export const tasksViewIcon: Record<TasksView, ReactNode> = {
  todo: <SquareIcon />,
  done: <CheckSquareIcon />,
  recurring: <RefreshIcon />,
  backlog: <ListIcon />,
}

export const {
  ViewProvider: TasksViewProvider,
  useView: useTasksView,
  RenderView: RenderTasksView,
} = getViewSetup<TasksView>({
  defaultView: 'todo',
  name: 'tasks',
})

export const TasksViewSelector = () => {
  const { view, setView } = useTasksView()
  const id = useId()

  return (
    <HStack gap={4}>
      {tasksView.map((value) => (
        <TabNavigationItem
          isSelected={value === view}
          onSelect={() => setView(value)}
          value={value}
          key={value}
          groupName={id}
        >
          <HStack alignItems="center" gap={8}>
            <IconWrapper>{tasksViewIcon[value]}</IconWrapper>
            <Text>{capitalizeFirstLetter(value)}</Text>
          </HStack>
        </TabNavigationItem>
      ))}
    </HStack>
  )
}
