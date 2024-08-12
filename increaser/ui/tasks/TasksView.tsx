import { CircleCheckIcon } from '@lib/ui/icons/CircleCheckIcon'
import { CircleDashedIcon } from '@lib/ui/icons/CircleDashedIcon'
import { CircleIcon } from '@lib/ui/icons/CircleIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { Text } from '@lib/ui/text'
import { getViewSetup } from '@lib/ui/view/getViewSetup'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { ReactNode, useId } from 'react'

export const tasksView = ['backlog', 'todo', 'done'] as const
export type TasksView = (typeof tasksView)[number]

export const tasksViewIcon: Record<TasksView, ReactNode> = {
  backlog: <CircleDashedIcon />,
  todo: <CircleIcon />,
  done: <CircleCheckIcon />,
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
