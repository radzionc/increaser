import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import * as projectsDB from '../db'

interface Input {
  id: string
}

export const deleteProject = async (
  _: any,
  { input: { id } }: { input: Input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  await projectsDB.deleteProject(userId, id)
}
