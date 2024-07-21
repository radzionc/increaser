import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { Text } from '@lib/ui/text'
import { ProjectEmoji } from '../projects/ProjectEmoji'
import { useCurrentTaskTemplate } from './CurrentTaskTemplateProvider'

export const TaskTemplateItemContent = () => {
  const { projectId, name } = useCurrentTaskTemplate()

  return (
    <PrefixedItemFrame
      prefix={
        <Text size={16} color="contrast">
          <ProjectEmoji id={projectId} />
        </Text>
      }
    >
      <Text style={{ flex: 1 }}>{name}</Text>
    </PrefixedItemFrame>
  )
}
