import { FocusContext } from '@increaser/app/focus/context/FocusContext'
import { useContext } from 'react'

export const useFocus = () => {
  const context = useContext(FocusContext)

  if (!context) {
    throw new Error('No FocusContext')
  }

  return context
}
