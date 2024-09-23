import { VStack } from '@lib/ui/css/stack'
import { TaskTemplateItem } from './TaskTemplateItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddTaskTemplate } from './AddTaskTemplate'
import { CurrentTaskTemplateProvider } from './CurrentTaskTemplateProvider'
import { useTaskTemplates } from './hooks/useTaskTemplates'
import { useFilterByProject } from '../projects/filter/project/state/projectFilter'
import { getProjectId } from '@increaser/entities-utils/project/getProjectId'

export const TaskTemplates = () => {
  const items = useFilterByProject(useTaskTemplates(), getProjectId)

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
