import { VStack } from '@lib/ui/css/stack'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { NoFilterMatches } from '@lib/ui/data/filter/NoFilterMatches'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getProjectId } from '@product/entities-utils/project/getProjectId'
import { ProductEducationBlock } from '@product/ui/education/ProductEducationBlock'
import { LearnMoreShyAction } from '@product/ui/info/LearnMoreShyAction'

import {
  useFilterByProject,
  useProjectFilter,
} from '../projects/filter/project/state/projectFilter'
import { useProject } from '../projects/hooks/useProject'

import { ActiveTaskFactory } from './ActiveTaskFactory'
import { AddTaskFactory } from './AddTaskFactory'
import { CurrentTaskFactoryProvider } from './CurrentTaskFactoryProvider'
import { useTaskFactories } from './hooks/useTaskFactories'
import { TaskFactoryItem } from './TaskFactoryItem'

export const TaskFactories = () => {
  const [projectId, setProjectFilter] = useProjectFilter()
  const project = useProject(projectId)

  const items = useFilterByProject(useTaskFactories(), getProjectId)

  if (isEmpty(items)) {
    if (project) {
      return (
        <NoFilterMatches
          title={`"${project.name}" has no recurring tasks yet`}
          onRemove={() => setProjectFilter(null)}
          action={<AddTaskFactory />}
        />
      )
    }

    return (
      <EmptyState
        title="Start with your first recurring task"
        action={
          <>
            <LearnMoreShyAction value="tasks" />
            <AddTaskFactory />
          </>
        }
      />
    )
  }

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
        </VStack>
      </VStack>
    </ActiveItemIdProvider>
  )
}
