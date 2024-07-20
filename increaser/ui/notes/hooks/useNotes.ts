import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { order } from '@lib/utils/array/order'

export const useNotes = () => {
  const { notes } = useAssertUserState()

  return useMemo(
    () => order(Object.values(notes), (note) => note.updatedAt, 'desc'),
    [notes],
  )
}
