import gql from 'graphql-tag'
import { identificationResultTypeDef } from '../auth/queries/identificationTypeDefs'
import { identifyTypeDefs } from '../auth/queries/identify'
import { identifyWithEmailTypeDefs } from '../auth/queries/identifyWithEmail'
import { identifyWithOAuthTypeDefs } from '../auth/queries/identifyWithOAuth'
import { habitTypeDefs } from '../habits/habitTypeDefs'
import { createHabitTypeDefs } from '../habits/mutations/createHabit'
import { createProjectTypeDefs } from '../projects/mutations/createProject'
import { deleteHabitTypeDefs } from '../habits/mutations/deleteHabit'
import { trackHabitTypeDefs } from '../habits/mutations/trackHabit'
import { updateHabitTypeDefs } from '../habits/mutations/updateHabit'
import { appStatsTypeDefs } from '../product/queries/appStats'
import { projectTypeDefs } from '../projects/projectsTypeDefs'
import { addSetTypeDefs } from '../sets/mutations/addSet'
import { editLastSetTypeDefs } from '../sets/mutations/editLastSet'
import { removeLastSetTypeDefs } from '../sets/mutations/removeLastSet'
import { userStateTypeDefs } from '../users/queries/userState'
import { updateUserTypeDefs } from '../users/mutation/updateUser'

const baseTypeDefs = gql`
  input AskForRefundInput {
    description: String
  }

  input UpdateProjectInput {
    id: ID!
    name: String
    color: Int
    status: ProjectStatus
    emoji: String
    allocatedMinutesPerWeek: Float
  }

  input DeleteProjectInput {
    id: ID!
  }

  input SendAuthLinkByEmailInput {
    email: String!
  }

  input UpdateWeekTimeAllocationInput {
    allocation: [Float]
  }

  input UpdateGoalToStartWorkAtInput {
    goalToStartWorkAt: Int
  }

  input UpdateGoalToFinishWorkByInput {
    goalToFinishWorkBy: Int
  }

  input UpdateGoalToGoToBedAtInput {
    goalToGoToBedAt: Int
  }

  input RedeemAppSumoCodeInput {
    code: String
  }

  type Query {
    projects: [Project]
  }

  type Mutation {
    sendAuthLinkByEmail(input: SendAuthLinkByEmailInput!): Boolean

    updateProject(input: UpdateProjectInput!): Project
    deleteProject(input: DeleteProjectInput!): Boolean

    updateWeekTimeAllocation(input: UpdateWeekTimeAllocationInput!): [Float]
    updateGoalToStartWorkAt(input: UpdateGoalToStartWorkAtInput!): Int
    updateGoalToFinishWorkBy(input: UpdateGoalToFinishWorkByInput!): Int
    updateGoalToGoToBedAt(input: UpdateGoalToGoToBedAtInput): Int

    askForRefund(askForRefundInput: AskForRefundInput!): Boolean

    redeemAppSumoCode(input: RedeemAppSumoCodeInput): Boolean
  }
`

export const typeDefs = [
  baseTypeDefs,
  identifyTypeDefs,
  identificationResultTypeDef,
  identifyWithOAuthTypeDefs,
  identifyWithEmailTypeDefs,
  habitTypeDefs,
  userStateTypeDefs,
  projectTypeDefs,
  appStatsTypeDefs,
  createHabitTypeDefs,
  createProjectTypeDefs,
  deleteHabitTypeDefs,
  trackHabitTypeDefs,
  updateHabitTypeDefs,
  addSetTypeDefs,
  editLastSetTypeDefs,
  removeLastSetTypeDefs,
  updateUserTypeDefs,
]
