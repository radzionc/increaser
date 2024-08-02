import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { AddTaskFactory } from '@increaser/ui/taskFactories/AddTaskFactory'
import { VStack } from '@lib/ui/layout/Stack'
import { useTaskFactories } from './hooks/useTaskFactories'
import { CurrentTaskFactoryProvider } from './CurrentTaskFactoryProvider'
import { TaskFactoryItem } from './TaskFactoryItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useProjectFilter } from '../projects/filter/useProjectFilter'
import { useMemo } from 'react'

export const ManageTaskFactories = () => {
  const taskFactories = useTaskFactories()

  const [projectId] = useProjectFilter()

  const items = useMemo(() => {
    return taskFactories.filter(({ task }) => {
      return projectId ? task.projectId === projectId : true
    })
  }, [projectId, taskFactories])

  return (
    <>
      <ProductEducationBlock value="recurringTasks" />
      <VStack>
        <ActiveItemIdProvider initialValue={null}>
          {items.map((item) => (
            <CurrentTaskFactoryProvider key={item.id} value={item}>
              <TaskFactoryItem />
            </CurrentTaskFactoryProvider>
          ))}
        </ActiveItemIdProvider>
        <AddTaskFactory />
      </VStack>
    </>
  )
}
