import { useMemo } from 'react'
import { useProjectFilter } from '../projects/filter/ProjectFilterProvider'
import { useAssertUserState } from '../user/UserStateContext'

export const useTasksToDo = () => {
  const [projectId] = useProjectFilter()
  const { tasks } = useAssertUserState()

  return useMemo(() => {
    const items = Object.values(tasks).filter((task) => task.status === 'todo')

    if (!projectId) {
      return items
    }

    return items.filter((item) => item.projectId === projectId)
  }, [projectId, tasks])
}
