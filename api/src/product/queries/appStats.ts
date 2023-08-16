import gql from 'graphql-tag'
import * as usersTable from '../../users/db'

export const appStatsTypeDefs = gql`
  type AppStats {
    registeredUsersNumber: Int
  }

  extend type Query {
    appStats: AppStats
  }
`

export const appStats = async () => {
  const registeredUsersNumber = await usersTable.getNumberOfUsers()

  return {
    registeredUsersNumber,
  }
}
