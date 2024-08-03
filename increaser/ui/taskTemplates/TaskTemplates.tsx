import { VStack } from '@lib/ui/layout/Stack'
import { TaskTemplateItem } from './TaskTemplateItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddTaskTemplate } from './AddTaskTemplate'
import { CurrentTaskTemplateProvider } from './CurrentTaskTemplateProvider'
import { useTaskTemplates } from './hooks/useTaskTemplates'

export const TaskTemplates = () => {
  const items = useTaskTemplates()

  return (
    <VStack style={{ maxWidth: 560 }}>
      <ActiveItemIdProvider initialValue={null}>
        {items.map((item) => (
          <CurrentTaskTemplateProvider key={item.id} value={item}>
            <TaskTemplateItem />
          </CurrentTaskTemplateProvider>
        ))}
      </ActiveItemIdProvider>
      <AddTaskTemplate />
    </VStack>
  )
}
