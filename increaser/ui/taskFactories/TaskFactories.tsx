import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { VStack } from '@lib/ui/css/stack'
import { useTaskFactories } from './hooks/useTaskFactories'
import { CurrentTaskFactoryProvider } from './CurrentTaskFactoryProvider'
import { TaskFactoryItem } from './TaskFactoryItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import {
  useFilterByProject,
  useProjectFilter,
} from '../projects/filter/project/state/projectFilter'
import { getProjectId } from '@increaser/entities-utils/project/getProjectId'
import { ActiveTaskFactory } from './ActiveTaskFactory'
import { useProject } from '../projects/hooks/useProject'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { NoFilterMatches } from '@lib/ui/data/filter/NoFilterMatches'
import { LearnMoreShyAction } from '@lib/ui/info/LearnMoreShyAction'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskFactory } from './AddTaskFactory'

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
