import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { VStack } from '@lib/ui/layout/Stack'
import { useEffect, useMemo } from 'react'
import { FocusTaskOption } from './FocusTaskOption'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { order } from '@lib/utils/array/order'

export const FocusTaskInput = () => {
  const { tasks } = useAssertUserState()
  const options = useMemo(() => {
    return order(
      Object.values(tasks).filter(
        (task) =>
          task.projectId &&
          !task.completedAt &&
          getDeadlineStatus({ ...task, now: Date.now() }) === 'today',
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
      <ShyInfoBlock>
        You don't have any tasks for today with a project assigned.
      </ShyInfoBlock>
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
