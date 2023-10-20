import { useAssertUserState } from 'user/state/UserStateContext'
import { ManageSubscriptionContext } from '@increaser/ui/subscription/ManageSubscriptionContext'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { useCallback } from 'react'

export const ManageSubscriptionProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { email, id } = useAssertUserState()

  const onChange = useCallback(() => {
    console.log('Refetch subscription & show modal')
  }, [])

  return (
    <ManageSubscriptionContext.Provider
      value={{ user: { email, id }, onChange }}
    >
      {children}
    </ManageSubscriptionContext.Provider>
  )
}
