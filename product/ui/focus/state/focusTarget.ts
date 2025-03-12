import { useMemo } from 'react'

import { useFocusProject } from './focusProject'
import { useFocusProjectTask } from './focusProjectTask'

export type FocusTarget = {
  projectId: string | null
  taskId: string | null
}

export const useFocusTarget = () => {
  const [project] = useFocusProject()
  const [projectTaskRecord] = useFocusProjectTask()

  return useMemo(() => {
    if (!project) {
      return { projectId: null, taskId: null }
    }

    const taskId = projectTaskRecord[project] ?? null

    return { projectId: project, taskId }
  }, [project, projectTaskRecord])
}
