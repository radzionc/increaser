import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { AddTaskFactory } from '@increaser/ui/taskFactories/AddTaskFactory'
import { VStack } from '@lib/ui/layout/Stack'
import { useTaskFactories } from './hooks/useTaskFactories'
import { CurrentTaskFactoryProvider } from './CurrentTaskFactoryProvider'
import { TaskFactoryItem } from './TaskFactoryItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

export const ManageTaskFactories = () => {
  const items = useTaskFactories()

  return (
    <>
      <VStack gap={32} style={{ maxWidth: 560 }}>
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
      </VStack>
    </>
  )
}
