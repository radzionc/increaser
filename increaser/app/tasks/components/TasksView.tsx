import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

import { AddTask } from './AddTask'
import { AddTaskButton } from './AddTaskButton'
import { TasksList } from './TasksList'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { NonEmptyOnly } from '@lib/ui/base/NonEmptyOnly'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

export const TasksView = () => {
  const { tasks } = useAssertUserState()

  const [isCreatingTask, { set: startCreatingTask, unset: stopCreatingTask }] =
    useBoolean(false)

  return (
    <VStack gap={20}>
      <Text color="contrast" size={18} weight="semibold">
        Tasks
      </Text>
      <SeparatedByLine gap={12}>
        <NonEmptyOnly array={tasks} render={() => <TasksList />} />
        {isCreatingTask ? (
          <AddTask onFinish={stopCreatingTask} />
        ) : (
          <AddTaskButton onClick={startCreatingTask} />
        )}
      </SeparatedByLine>
    </VStack>
  )
}
