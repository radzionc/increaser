import { useCurrentNote } from './CurrentNoteProvider'
import { Text } from '@lib/ui/text'

export const NoteDescription = () => {
  const { description } = useCurrentNote()

  return (
    <Text size={14} color="supporting">
      {description}
    </Text>
  )
}
