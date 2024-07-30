import { useMemo, useState } from 'react'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { FocusTaskSelector } from './FocusTaskSelector'
import { CreateFocusTaskPrompt } from './CreateFocusTaskPrompt'
import { CreateFocusTaskOverlay } from './CreateFocusTaskOverlay'
import { useTodayIncompleteTasks } from '@increaser/ui/tasks/hooks/useTodayIncompleteTasks'
import { getLastItem } from '@lib/utils/array/getLastItem'

export const SelectFocusTask = () => {
  const { intervals } = useCurrentFocus()
  const { projectId } = getLastItem(intervals)
  const todayTasks = useTodayIncompleteTasks()
  const options = useMemo(
    () => todayTasks.filter((task) => task.projectId === projectId),
    [projectId, todayTasks],
  )

  const [isCreatingTask, setIsCreatingTask] = useState(false)

  if (isCreatingTask) {
    return <CreateFocusTaskOverlay onFinish={() => setIsCreatingTask(false)} />
  }

  if (!options.length) {
    return <CreateFocusTaskPrompt onClick={() => setIsCreatingTask(true)} />
  }

  return (
    <FocusTaskSelector
      onAdd={() => setIsCreatingTask(true)}
      options={options}
    />
  )
}
