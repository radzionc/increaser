import { useMemo, useState } from 'react'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { FocusTaskSelector } from './FocusTaskSelector'
import { CreateFocusTaskPrompt } from './CreateFocusTaskPrompt'
import { CreateFocusTaskOverlay } from './CreateFocusTaskOverlay'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useFocusTaskGroups } from '../../tasks/useFocusTaskGroups'

export const SelectFocusTask = () => {
  const { intervals } = useCurrentFocus()
  const { projectId } = getLastItem(intervals)
  const groups = useFocusTaskGroups()
  const options = useMemo(
    () =>
      groups
        .flatMap(({ tasks }) => tasks)
        .filter((task) => task.projectId === projectId),
    [groups, projectId],
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
