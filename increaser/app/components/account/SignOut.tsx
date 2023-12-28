import { Button } from '@lib/ui/buttons/Button'
import { useAuthSession } from '@increaser/app/auth/hooks/useAuthSession'

export const SignOut = () => {
  const [, setAuthSession] = useAuthSession()

  return (
    <Button kind="outlined" onClick={() => setAuthSession(undefined)}>
      Sign out
    </Button>
  )
}
