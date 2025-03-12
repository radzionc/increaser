import { Button } from '@lib/ui/buttons/Button'
import { ActionPrompt } from '@lib/ui/info/ActionPrompt'
import { ChildrenProp } from '@lib/ui/props'
import { getAppPath } from '@product/ui/navigation/app'
import Link from 'next/link'

import { useIsPayingUser } from '../membership/hooks/useIsPayingUser'

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
