import { productName } from '@increaser/config'
import { useIsPayingUser } from '../hooks/useIsPayingUser'

export const MembershipPageTitle = () => {
  const isPayingUser = useIsPayingUser()

  if (isPayingUser) {
    return 'Membership'
  }

  return `Become ${productName} member`
}
