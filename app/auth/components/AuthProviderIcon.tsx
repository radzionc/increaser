import { AuthProvider } from '@increaser/api-interface/client/graphql'
import { Match } from '@increaser/ui/ui/Match'
import { FacebookIcon } from '@increaser/ui/ui/icons/FacebookIcon'
import { GoogleIcon } from '@increaser/ui/ui/icons/GoogleIcon'

interface AuthProviderIconProps {
  provider: AuthProvider
}

export const AuthProviderIcon = ({ provider }: AuthProviderIconProps) => (
  <Match
    value={provider}
    google={() => <GoogleIcon />}
    facebook={() => <FacebookIcon />}
  />
)
