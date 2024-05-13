import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useCurrentTask } from './CurrentTaskProvider'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'

export const TaskProject = () => {
  const { projectId } = useCurrentTask()
  const { projectsRecord } = useProjects()

  if (!projectId) return null

  const { emoji } = projectsRecord[projectId]

  return <EmojiTextPrefix emoji={emoji} />
}
