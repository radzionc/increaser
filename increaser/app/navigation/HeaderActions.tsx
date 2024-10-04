import { HStack } from '@lib/ui/css/stack'
import { FeaturesNavigationItem } from '../features/FeaturesNavigationItem'
import { ManageAccount } from '../user/components/ManageAccount'

export const HeaderActions = () => {
  return (
    <HStack alignItems="center">
      <ManageAccount />
      <FeaturesNavigationItem />
    </HStack>
  )
}
