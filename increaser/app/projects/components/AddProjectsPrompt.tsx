import { AppPath } from '@increaser/ui/navigation/AppPath'
import { Button } from '@lib/ui/buttons/Button'
import Link from 'next/link'
import { ActionPrompt } from '@lib/ui/info/ActionPrompt'
import { otherProject } from '@increaser/entities/Project'

export const AddProjectsPrompt = () => (
  <ActionPrompt
    action={
      <Link href={AppPath.Projects}>
        <Button as="div">Add projects</Button>
      </Link>
    }
  >
    To make the most of your focus session and track your progress accurately,
    consider adding a project. Otherwise, your work will be categorized as '
    {otherProject.name}'.
  </ActionPrompt>
)
