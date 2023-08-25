import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../graphql/OperationContext'
import * as projectsDB from '../db'

interface Input {
  id: string
  name?: string
  color?: number
  emoji?: string
  allocatedMinutesPerWeek?: number
}

export const updateProject = async (
  _: any,
  { input }: { input: Input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  const { id, ...fields } = input

  const project = projectsDB.updateProject(userId, id, fields)

  return project
}
