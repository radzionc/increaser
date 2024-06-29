import { getAppPath } from '@increaser/ui/navigation/app'
import { Button } from '@lib/ui/buttons/Button'
import Link from 'next/link'
import { ActionPrompt } from '@lib/ui/info/ActionPrompt'
import { otherProjectId } from '@increaser/entities/Project'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const AddProjectsPrompt = () => {
  const { projects } = useAssertUserState()

  return (
    <ActionPrompt
      action={
        <Link href={getAppPath('projects')}>
          <Button as="div">Add projects</Button>
        </Link>
      }
    >
      To make the most of your focus session and track your progress accurately,
      consider adding a project. Otherwise, your work will be categorized as '
      {projects[otherProjectId].name}'.
    </ActionPrompt>
  )
}
