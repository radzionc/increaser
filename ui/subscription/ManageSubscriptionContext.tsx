import { User } from '@increaser/entities/User'
import { createContext } from 'react'
import { createContextHook } from '../state/createContextHook'

interface ManageSubscriptionContextValue {
  user: Pick<User, 'id' | 'email'>
  onChange: () => void
}

export const ManageSubscriptionContext = createContext<
  ManageSubscriptionContextValue | undefined
>(undefined)

export const useManageSubscription = createContextHook(
  ManageSubscriptionContext,
  'ManageSubscription',
)
