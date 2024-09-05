import { HStack } from '@lib/ui/css/stack'
import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'
import { TaskCadence } from './TaskCadence'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { Text } from '@lib/ui/text'
import { ProjectEmoji } from '../projects/ProjectEmoji'

export const TaskFactoryItemContent = () => {
  const { task } = useCurrentTaskFactory()

  return (
    <PrefixedItemFrame
      prefix={
        <Text size={16} color="contrast">
          <ProjectEmoji id={task.projectId} />
        </Text>
      }
    >
      <HStack fullWidth gap={20}>
        <Text style={{ flex: 1 }}>{task.name}</Text>
        <TaskCadence />
      </HStack>
    </PrefixedItemFrame>
  )
}
