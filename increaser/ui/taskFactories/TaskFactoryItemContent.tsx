import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { Text } from '@lib/ui/text'
import { ProjectEmoji } from '../projects/ProjectEmoji'
import { TaskFactoryTitle } from './TaskFactoryTitle'

export const TaskFactoryItemContent = () => {
  const { projectId } = useCurrentTaskFactory()

  return (
    <PrefixedItemFrame
      prefix={
        <Text size={16} color="contrast">
          <ProjectEmoji id={projectId} />
        </Text>
      }
    >
      <TaskFactoryTitle />
    </PrefixedItemFrame>
  )
}
