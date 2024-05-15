import { AppPath } from '@increaser/ui/navigation/AppPath'
import { Button } from '@lib/ui/buttons/Button'
import Link from 'next/link'
import { ActionPrompt } from '@lib/ui/info/ActionPrompt'

export const AddProjectsPrompt = () => (
  <ActionPrompt
    action={
      <Link href={AppPath.Projects}>
        <Button as="div">Add projects</Button>
      </Link>
    }
  >
    Create a project to continue.
  </ActionPrompt>
)
