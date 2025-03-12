import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { otherProjectId } from '@product/entities/Project'
import { useUser } from '@product/ui/user/state/user'

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
