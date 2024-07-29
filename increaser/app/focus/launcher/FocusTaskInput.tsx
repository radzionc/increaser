import { VStack } from '@lib/ui/layout/Stack'
import { useEffect } from 'react'
import { FocusTaskOption } from './FocusTaskOption'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { useTodayIncompleteTasks } from '@increaser/ui/tasks/hooks/useTodayIncompleteTasks'
import { AddTask } from './AddTask'

export const FocusTaskInput = () => {
  const options = useTodayIncompleteTasks()

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

  return (
    <VStack gap={8}>
      {options.map((task) => (
        <CurrentTaskProvider value={task} key={task.id}>
          <FocusTaskOption />
        </CurrentTaskProvider>
      ))}
      <AddTask />
    </VStack>
  )
}
