import { getAppPath } from '@increaser/ui/navigation/app'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const RequiresOnboarding = ({
  children,
}: ComponentWithChildrenProps) => {
  const { finishedOnboardingAt } = useAssertUserState()
  const { push } = useRouter()

  useEffect(() => {
    if (!finishedOnboardingAt) {
      push(getAppPath('onboarding'))
    }
  }, [finishedOnboardingAt, push])

  if (!finishedOnboardingAt) return null

  return <>{children}</>
}
