import { assertUserId } from '../../auth/assertUserId'
import * as notesDb from '@increaser/db/note'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const deleteNote: ApiResolver<'deleteNote'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  await notesDb.deleteNote(userId, id)
}
