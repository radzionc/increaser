import { gql } from 'apollo-server-lambda'

export const habitTypeDefs = gql`
  type Habit {
    id: ID
    name: String
    emoji: String
    color: Int
    order: Float
    startedAt: Float
    successes: [String]
  }
`
