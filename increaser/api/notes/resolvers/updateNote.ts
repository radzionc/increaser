import { assertUserId } from '../../auth/assertUserId'
import * as notesDb from '@increaser/db/note'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateNote: ApiResolver<'updateNote'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const { id, fields } = input

  const value = notesDb.updateNote(userId, id, fields)

  return value
}
