import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCurrentPage } from '../navigation/hooks/useCurrentPage'
import { getAppPath } from '@increaser/ui/navigation/app'

export const ManageOnboarding = () => {
  const { finishedOnboardingAt } = useAssertUserState()
  const { push } = useRouter()
  const currentPage = useCurrentPage()

  useEffect(() => {
    if (currentPage !== 'onboarding' && !finishedOnboardingAt) {
      push(getAppPath('onboarding'))
    }
  }, [currentPage, finishedOnboardingAt, push])

  return null
}
