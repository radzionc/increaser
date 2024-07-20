import { Note } from '@increaser/entities/Note'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const { useValue: useCurrentNote, provider: CurrentNoteProvider } =
  getValueProviderSetup<Note>('Note')
