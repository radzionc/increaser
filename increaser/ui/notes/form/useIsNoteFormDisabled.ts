import { useMemo } from 'react'
import { NoteFormShape } from './NoteFormShape'

export const useIsNoteFormDisabled = ({ name }: NoteFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])
}
