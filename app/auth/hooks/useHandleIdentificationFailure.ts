import { reportError } from 'errors/errorMonitoring'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Path } from 'router/Path'
import { useSnackbar } from 'ui/Snackbar/useSnackbar'

const FAIL_MESSAGE = '😰 Please try a different login option'

export const useHandleIdentificationFailure = (error: unknown) => {
  const router = useRouter()
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    if (!error) return

    reportError(error, { context: 'Fail to process OAuth params' })

    router.push(Path.Landing)
    showSnackbar({ text: FAIL_MESSAGE })
  }, [error, router, showSnackbar])
}
