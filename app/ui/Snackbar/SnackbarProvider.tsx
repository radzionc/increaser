import React, { useCallback, useEffect, useState } from 'react'
import { MS_IN_SEC } from 'utils/time'

import { Snackbar, SnackbarContext, SnackbarState } from './SnackbarContext'
import { SnackbarOverlay } from './SnackbarOverlay'

interface Props {
  children: React.ReactNode
}

const defaultSnackbarDuration = 5 * MS_IN_SEC

interface ShowSnackbarParams {
  text: string
  duration?: number
}

export const SnackbarProvider = ({ children }: Props) => {
  const [snackbar, setSnackbar] = useState<Snackbar | null>(null)

  const hideSnackbar = useCallback(() => setSnackbar(null), [])

  useEffect(() => {
    if (!snackbar) return

    const timeout = setTimeout(hideSnackbar, snackbar.duration)
    return () => clearTimeout(timeout)
  }, [hideSnackbar, snackbar])

  const showSnackbar = useCallback(
    ({ text, duration = defaultSnackbarDuration }: ShowSnackbarParams) => {
      setSnackbar({ text, showedAt: Date.now(), duration })
    },
    [],
  )

  const value: SnackbarState = {
    showSnackbar,
    hideSnackbar,
    currentSnackbar: snackbar,
  }

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {snackbar && <SnackbarOverlay />}
    </SnackbarContext.Provider>
  )
}
