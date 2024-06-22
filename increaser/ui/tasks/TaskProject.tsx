import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { ComponentWithValueProps } from '@lib/ui/props'

export const TaskProject = ({ value }: ComponentWithValueProps<string>) => {
  const { projectsRecord } = useProjects()

  const { emoji } = projectsRecord[value]

  return <EmojiTextPrefix emoji={emoji} />
}
