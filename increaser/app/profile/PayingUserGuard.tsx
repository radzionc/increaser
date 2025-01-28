import { ChildrenProp } from '@lib/ui/props'
import { useIsPayingUser } from '../membership/hooks/useIsPayingUser'
import { ActionPrompt } from '@lib/ui/info/ActionPrompt'
import Link from 'next/link'
import { Button } from '@lib/ui/buttons/Button'
import { getAppPath } from '@increaser/ui/navigation/app'

export const PayingUserGuard = ({ children }: ChildrenProp) => {
  const isPaying = useIsPayingUser()

  if (isPaying) {
    return <>{children}</>
  }

  return (
    <ActionPrompt
      action={
        <Link href={getAppPath('membership')}>
          <Button as="div">Upgrade</Button>
        </Link>
      }
    >
      Upgrade to a paid subscription to enable your public profile. Show your
      name and country on the leaderboard and feature requests!
    </ActionPrompt>
  )
}
