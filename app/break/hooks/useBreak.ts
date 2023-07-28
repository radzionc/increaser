import { BreakContext } from 'break/context/BreakContext'
import { useContext } from 'react'

export const useBreak = () => {
  const context = useContext(BreakContext)

  if (!context) {
    throw new Error('No BreakContext')
  }

  return context
}
