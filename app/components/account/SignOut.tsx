import { Button } from '@increaser/ui/ui/buttons/Button'
import { useAuthSession } from 'auth/hooks/useAuthSession'

export const SignOut = () => {
  const [, setAuthSession] = useAuthSession()

  return (
    <Button kind="outlined" onClick={() => setAuthSession(undefined)}>
      Sign out
    </Button>
  )
}
