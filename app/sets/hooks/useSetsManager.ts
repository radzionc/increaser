import { useContext } from 'react'
import { SetsManagerContext } from 'sets/context/SetsManagerContext'

export const useSetsManager = () => {
  const context = useContext(SetsManagerContext)

  if (!context) {
    throw new Error('No SetsManagerContext')
  }

  return context
}
