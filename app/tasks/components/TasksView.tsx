import { useBoolean } from 'shared/hooks/useBoolean'
import { TitledSection } from '@increaser/ui/ui/Layout/TitledSection'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'

import { AddTask } from './AddTask'
import { AddTaskButton } from './AddTaskButton'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { TaskItem } from './TaskItem'

export const TasksView = () => {
  const { tasks } = useAssertUserState()

  const [isCreatingTask, { set: startCreatingTask, unset: stopCreatingTask }] =
    useBoolean(false)

  return (
    <TitledSection
      title={
        <HStack gap={8}>
          <Text color="regular">Today tasks</Text>
          {tasks.length > 0 && (
            <Text color="supporting" as="span">
              {tasks.filter((task) => task.isCompleted).length} / {tasks.length}
            </Text>
          )}
        </HStack>
      }
    >
      <VStack gap={16}>
        {tasks.map((task) => (
          <CurrentTaskProvider value={task} key={task.id}>
            <TaskItem />
          </CurrentTaskProvider>
        ))}
        {isCreatingTask ? (
          <AddTask onFinish={stopCreatingTask} />
        ) : (
          <AddTaskButton onClick={startCreatingTask} />
        )}
      </VStack>
    </TitledSection>
  )
}
