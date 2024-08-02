import { VStack } from '@lib/ui/layout/Stack'
import { TaskTemplateItem } from './TaskTemplateItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddTaskTemplate } from './AddTaskTemplate'
import { CurrentTaskTemplateProvider } from './CurrentTaskTemplateProvider'
import { useTaskTemplates } from './hooks/useTaskTemplates'
import { useMemo } from 'react'
import { useProjectFilter } from '../projects/filter/ProjectFilterProvider'

export const TaskTemplates = () => {
  const templates = useTaskTemplates()

  const [projectId] = useProjectFilter()

  const items = useMemo(() => {
    return templates.filter((template) => {
      return projectId ? template.projectId === projectId : true
    })
  }, [projectId, templates])

  return (
    <>
      <VStack>
        <ActiveItemIdProvider initialValue={null}>
          {items.map((item) => (
            <CurrentTaskTemplateProvider key={item.id} value={item}>
              <TaskTemplateItem />
            </CurrentTaskTemplateProvider>
          ))}
        </ActiveItemIdProvider>
        <AddTaskTemplate />
      </VStack>
    </>
  )
}
