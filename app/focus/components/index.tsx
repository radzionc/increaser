import { UserStateOnly } from 'user/state/UserStateOnly'

import { FocusPageContent } from './FocusPageContent'
import { useFocus } from 'focus/hooks/useFocus'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Path } from 'router/Path'
import { CurrentFocusProvider } from './CurrentFocusProvider'

export const FocusPage = () => {
  const { currentSet } = useFocus()

  const router = useRouter()

  useEffect(() => {
    if (!currentSet) {
      router.replace(Path.Home)
    }
  }, [currentSet, router])

  if (!currentSet) {
    return null
  }

  return (
    <UserStateOnly>
      <CurrentFocusProvider value={currentSet}>
        <FocusPageContent />
      </CurrentFocusProvider>
    </UserStateOnly>
  )
}
