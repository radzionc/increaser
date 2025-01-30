import { VStack } from '@lib/ui/css/stack'
import { TaskTemplateItem } from './TaskTemplateItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { CurrentTaskTemplateProvider } from './CurrentTaskTemplateProvider'
import { useTaskTemplates } from './hooks/useTaskTemplates'
import {
  useFilterByProject,
  useProjectFilter,
} from '../projects/filter/project/state/projectFilter'
import { getProjectId } from '@increaser/entities-utils/project/getProjectId'
import { ActiveTaskTemplate } from './ActiveTaskTemplate'
import { useProject } from '../projects/hooks/useProject'
import { NoFilterMatches } from '@lib/ui/data/filter/NoFilterMatches'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { LearnMoreShyAction } from '@lib/ui/info/LearnMoreShyAction'
import { AddTaskTemplate } from './AddTaskTemplate'

export const TaskTemplatesContent = () => {
  const [projectId, setProjectFilter] = useProjectFilter()
  const project = useProject(projectId)

  const items = useFilterByProject(useTaskTemplates(), getProjectId)

  if (isEmpty(items)) {
    if (project) {
      return (
        <NoFilterMatches
          title={`"${project.name}" has no templates yet`}
          onRemove={() => setProjectFilter(null)}
          action={<AddTaskTemplate />}
        />
      )
    }

    return (
      <EmptyState
        title="Start with your first template"
        action={
          <>
            <LearnMoreShyAction value="tasks" />
            <AddTaskTemplate />
          </>
        }
      />
    )
  }

  return (
    <VStack style={{ maxWidth: 560 }}>
      <ActiveItemIdProvider initialValue={null}>
        <ActiveTaskTemplate />
        {items.map((item) => (
          <CurrentTaskTemplateProvider key={item.id} value={item}>
            <TaskTemplateItem />
          </CurrentTaskTemplateProvider>
        ))}
      </ActiveItemIdProvider>
    </VStack>
  )
}
