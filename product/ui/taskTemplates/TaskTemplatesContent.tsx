import { VStack } from '@lib/ui/css/stack'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { NoFilterMatches } from '@lib/ui/data/filter/NoFilterMatches'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getProjectId } from '@product/entities-utils/project/getProjectId'
import { LearnMoreShyAction } from '@product/ui/info/LearnMoreShyAction'

import {
  useFilterByProject,
  useProjectFilter,
} from '../projects/filter/project/state/projectFilter'
import { useProject } from '../projects/hooks/useProject'

import { ActiveTaskTemplate } from './ActiveTaskTemplate'
import { AddTaskTemplate } from './AddTaskTemplate'
import { CurrentTaskTemplateProvider } from './CurrentTaskTemplateProvider'
import { useTaskTemplates } from './hooks/useTaskTemplates'
import { TaskTemplateItem } from './TaskTemplateItem'

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
