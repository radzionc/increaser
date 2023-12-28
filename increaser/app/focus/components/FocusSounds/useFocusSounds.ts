import { useContext } from 'react'

import { FocusSoundsContext } from './FocusSoundsContext'

export const useFocusSounds = () => {
  const context = useContext(FocusSoundsContext)

  if (!context) {
    throw new Error('No FocusSoundsContext')
  }

  return context
}
