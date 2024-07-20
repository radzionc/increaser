import { assertUserId } from '../../auth/assertUserId'
import * as notesDb from '@increaser/db/note'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { Note } from '@increaser/entities/Note'

export const createNote: ApiResolver<'createNote'> = async ({
  input,
  context,
}): Promise<Note> => {
  const userId = assertUserId(context)

  await notesDb.putNote(userId, input)

  return input
}
