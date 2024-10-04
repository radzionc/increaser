import { otherProjectId } from '@increaser/entities/Project'
import { useUser } from '@increaser/ui/user/state/user'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'

export const AddProjectsPrompt = () => {
  const { projects } = useUser()

  return (
    <ShyInfoBlock>
      To make the most of your focus session and track your progress accurately,
      consider adding a project. Otherwise, your work will be categorized as '
      {projects[otherProjectId].name}'.
    </ShyInfoBlock>
  )
}
