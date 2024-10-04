import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { useProjectFilter } from '../projects/filter/project/state/projectFilter'

export const useTasksToDo = () => {
  const [projectId] = useProjectFilter()
  const { tasks } = useUser()

  return useMemo(() => {
    const items = Object.values(tasks).filter((task) => task.status === 'todo')

    if (!projectId) {
      return items
    }

    return items.filter((item) => item.projectId === projectId)
  }, [projectId, tasks])
}
