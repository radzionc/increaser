import { useAuth } from 'auth/hooks/useAuth'
import { Button } from '@increaser/ui/ui/buttons/Button'

export const SignOut = () => {
  const { unauthorize } = useAuth()

  return (
    <Button kind="outlined" onClick={unauthorize}>
      Sign out
    </Button>
  )
}
