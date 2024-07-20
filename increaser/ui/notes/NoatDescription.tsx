import { useCurrentNote } from './CurrentNoteProvider'
import { Text } from '@lib/ui/text'

export const NoteDescription = () => {
  const { description } = useCurrentNote()

  return <Text>{description}</Text>
}
