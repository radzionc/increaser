import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { TitledSection } from '@lib/ui/Layout/TitledSection'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

import { AddTask } from './AddTask'
import { AddTaskButton } from './AddTaskButton'
import { TasksList } from './TasksList'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

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
      <SeparatedByLine gap={12}>
        <TasksList />
        {isCreatingTask ? (
          <AddTask onFinish={stopCreatingTask} />
        ) : (
          <AddTaskButton onClick={startCreatingTask} />
        )}
      </SeparatedByLine>
    </TitledSection>
  )
}
