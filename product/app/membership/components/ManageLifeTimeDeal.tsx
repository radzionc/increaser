import { Text } from '@lib/ui/text'
import { productName } from '@product/config'
import { useUser } from '@product/ui/user/state/user'

export const ManageLifeTimeDeal = () => {
  const { lifeTimeDeal } = useUser()

  if (!lifeTimeDeal) return null

  return <Text>You have a life-time access to {productName}!</Text>
}
