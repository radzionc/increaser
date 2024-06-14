import { putEmail } from '../email'
import { getAllUsers } from '../user'
import { attempt } from '@lib/utils/attempt'
;(async () => {
  const users = await getAllUsers(['email'])

  await Promise.all(
    users.map(({ email }) => attempt(() => putEmail({ id: email }), undefined)),
  )
})()
