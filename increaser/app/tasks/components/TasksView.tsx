import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { TitledSection } from '@lib/ui/Layout/TitledSection'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

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
          <Text color="regular">Tasks</Text>
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
