import { TaskBoard } from '@product/ui/tasks/board/TaskBoard'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const TaskBoardDemo = () => {
  const { tasks } = useUser()

  const items = useMemo(() => Object.values(tasks), [tasks])

  return <TaskBoard items={items} />
}
