import { useState } from 'react'
import { FocusTaskSelector } from './FocusTaskSelector'
import { CreateFocusTaskPrompt } from './CreateFocusTaskPrompt'
import { CreateFocusTaskOverlay } from './CreateFocusTaskOverlay'
import { useFilteredFocusTasks } from '../../tasks/useFilteredFocusTasks'

export const SelectFocusTask = () => {
  const options = useFilteredFocusTasks()

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
