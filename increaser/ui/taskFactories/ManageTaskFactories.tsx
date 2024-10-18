import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { AddTaskFactory } from '@increaser/ui/taskFactories/AddTaskFactory'
import { VStack } from '@lib/ui/css/stack'
import { useTaskFactories } from './hooks/useTaskFactories'
import { CurrentTaskFactoryProvider } from './CurrentTaskFactoryProvider'
import { TaskFactoryItem } from './TaskFactoryItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useFilterByProject } from '../projects/filter/project/state/projectFilter'
import { getProjectId } from '@increaser/entities-utils/project/getProjectId'
import { ActiveTaskFactory } from './ActiveTaskFactory'

export const ManageTaskFactories = () => {
  const items = useFilterByProject(useTaskFactories(), getProjectId)

  return (
    <ActiveItemIdProvider initialValue={null}>
      <ActiveTaskFactory />
      <VStack gap={32} style={{ maxWidth: 560 }}>
        <ProductEducationBlock value="recurringTasks" />
        <VStack>
          {items.map((item) => (
            <CurrentTaskFactoryProvider key={item.id} value={item}>
              <TaskFactoryItem />
            </CurrentTaskFactoryProvider>
          ))}
          <AddTaskFactory />
        </VStack>
      </VStack>
    </ActiveItemIdProvider>
  )
}
