import { QueryResolvers } from '../../gql/schema'
import { getNumberOfUsers } from '@increaser/db/user'

export const appStats: QueryResolvers['appStats'] = async () => {
  const registeredUsersNumber = await getNumberOfUsers()

  return {
    registeredUsersNumber,
  }
}
