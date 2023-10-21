import { PaddleClassicUser } from '../entities'
import { queryPaddle } from '../utils/queryPaddle'

const getSubscription = async (id: string) => {
  const [user] = await queryPaddle<PaddleClassicUser[]>('subscription/users', {
    subscription_id: id,
  })

  console.log(user)
}

const id = process.argv[2]

getSubscription(id)
