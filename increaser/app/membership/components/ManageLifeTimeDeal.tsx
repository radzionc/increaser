import { Text } from '@lib/ui/text'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { productName } from '@increaser/config'

export const ManageLifeTimeDeal = () => {
  const { lifeTimeDeal } = useAssertUserState()

  if (!lifeTimeDeal) return null

  return <Text>You have a life-time access to {productName}!</Text>
}
