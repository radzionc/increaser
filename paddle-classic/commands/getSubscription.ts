import { getSubscription } from '../utils/getSubscription'

const run = async (id: string) => {
  const subscription = await getSubscription(id)

  console.log(subscription)
}

const id = process.argv[2]

run(id)
