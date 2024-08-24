import { HStack } from '@lib/ui/layout/Stack'
import { FeaturesNavigationItem } from '../features/FeaturesNavigationItem'
import { ManageAccount } from '../user/components/ManageAccount'
import { UserStateOnly } from '../user/state/UserStateOnly'

export const HeaderActions = () => {
  return (
    <UserStateOnly>
      <HStack alignItems="center">
        <ManageAccount />
        <FeaturesNavigationItem />
      </HStack>
    </UserStateOnly>
  )
}
