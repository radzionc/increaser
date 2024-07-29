import { otherProjectId } from '@increaser/entities/Project'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'

export const AddProjectsPrompt = () => {
  const { projects } = useAssertUserState()

  return (
    <ShyInfoBlock>
      To make the most of your focus session and track your progress accurately,
      consider adding a project. Otherwise, your work will be categorized as '
      {projects[otherProjectId].name}'.
    </ShyInfoBlock>
  )
}
