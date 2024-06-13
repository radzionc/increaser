import { getAppPath } from '@increaser/ui/navigation/app'
import { Button } from '@lib/ui/buttons/Button'
import Link from 'next/link'
import { ActionPrompt } from '@lib/ui/info/ActionPrompt'

export const AddHabitsPrompt = () => {
  return (
    <ActionPrompt
      action={
        <Link href={getAppPath('habits', 'my')}>
          <Button as="div">Add habits</Button>
        </Link>
      }
    >
      Your habit tracker is empty. Add habits to get started!
    </ActionPrompt>
  )
}
