import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { getId } from '@increaser/entities-utils/shared/getId'
import * as projectsDB from '../db'
import gql from 'graphql-tag'

import { defaultProjectProperties, Project } from '../Project'

export const createProjectTypeDefs = gql`
  input CreateProjectInput {
    id: String
    name: String!
    color: Int!
    emoji: String!
    allocatedMinutesPerWeek: Float!
  }

  extend type Mutation {
    createProject(input: CreateProjectInput!): Project
  }
`

interface Input {
  name: string
  color: number
  emoji: string
  allocatedMinutesPerWeek: number
}

export const createProject = async (
  _: any,
  { input }: { input: Input },
  context: OperationContext,
): Promise<Project> => {
  const userId = assertUserId(context)

  const project: Project = {
    id: getId(),
    ...defaultProjectProperties,
    ...input,
  }

  await projectsDB.putProject(userId, project)

  return project
}
