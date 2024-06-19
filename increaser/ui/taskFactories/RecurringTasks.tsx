import { VStack } from '@lib/ui/layout/Stack'
import { useTaskFactories } from './hooks/useTaskFactories'
import { CurrentTaskFactoryProvider } from './CurrentTaskFactoryProvider'
import { TaskFactoryItem } from './TaskFactoryItem'

export const RecurringTasks = () => {
  const items = useTaskFactories()

  return (
    <VStack>
      {items.map((item) => (
        <CurrentTaskFactoryProvider key={item.id} value={item}>
          <TaskFactoryItem />
        </CurrentTaskFactoryProvider>
      ))}
    </VStack>
  )
}
