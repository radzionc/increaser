import { Text } from '@lib/ui/text'
import { useUser } from '@increaser/ui/user/state/user'
import { productName } from '@increaser/config'

export const ManageLifeTimeDeal = () => {
  const { lifeTimeDeal } = useUser()

  if (!lifeTimeDeal) return null

  return <Text>You have a life-time access to {productName}!</Text>
}
