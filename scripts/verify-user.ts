import { getUser } from '@product/db/user'

getUser('local-real-user', ['id', 'email', 'lastVisitAt', 'timeZone']).then(
  console.log,
)
