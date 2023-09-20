import { Button } from '@increaser/ui/ui/buttons/Button'
import { useAuth } from 'auth/components/AuthProvider'

export const SignOut = () => {
  const { unauthorize } = useAuth()

  return (
    <Button kind="outlined" onClick={unauthorize}>
      Sign out
    </Button>
  )
}
