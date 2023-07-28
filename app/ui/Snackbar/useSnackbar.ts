import { useContext } from 'react'

import { SnackbarContext } from './SnackbarContext'

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)

  if (!context) {
    throw new Error('SnackbarContext is not provided')
  }

  return context
}
