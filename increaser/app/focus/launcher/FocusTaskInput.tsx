import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VStack } from '@lib/ui/layout/Stack'
import { useEffect, useMemo } from 'react'
import { FocusTaskOption } from './FocusTaskOption'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { order } from '@lib/utils/array/order'
import Link from 'next/link'
import { getAppPath } from '@increaser/ui/navigation/app'
import { Button } from '@lib/ui/buttons/Button'
import { ActionPrompt } from '@lib/ui/info/ActionPrompt'

export const FocusTaskInput = () => {
  const { tasks } = useAssertUserState()
  const options = useMemo(() => {
    return order(
      Object.values(tasks).filter(
        (task) =>
          task.projectId &&
          !task.completedAt &&
          ['overdue', 'today'].includes(
            getDeadlineStatus({ ...task, now: Date.now() }),
          ),
      ),
      (task) => task.order,
      'asc',
    )
  }, [tasks])

  const { taskId, setState } = useFocusLauncher()

  useEffect(() => {
    const option = options.find((option) => option.id === taskId)
    if (!option && options.length) {
      setState((state) => ({
        ...state,
        taskId: shouldBePresent(options[0].id),
        projectId: shouldBePresent(options[0].projectId),
      }))
    }
  }, [options, setState, taskId])

  if (!options.length) {
    return (
      <ActionPrompt
        action={
          <Link style={{ alignSelf: 'end' }} href={getAppPath('tasks', 'todo')}>
            <Button as="div">Manage tasks</Button>
          </Link>
        }
      >
        You don't have any tasks for today.
      </ActionPrompt>
    )
  }

  return (
    <VStack gap={8}>
      {options.map((task) => (
        <CurrentTaskProvider value={task} key={task.id}>
          <FocusTaskOption />
        </CurrentTaskProvider>
      ))}
    </VStack>
  )
}
