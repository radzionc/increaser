import { gql } from 'apollo-server-lambda'

export const projectTypeDefs = gql`
  enum ProjectStatus {
    ACTIVE
    INACTIVE
  }

  type ProjectWeek {
    year: Int!
    week: Int!
    seconds: Float!
  }

  type ProjectMonth {
    year: Int!
    month: Int!
    seconds: Float!
  }

  type Project {
    id: ID
    name: String
    emoji: String
    color: Int
    status: ProjectStatus
    total: Float
    allocatedMinutesPerWeek: Float
    weeks: [ProjectWeek]
    months: [ProjectMonth]
  }
`
