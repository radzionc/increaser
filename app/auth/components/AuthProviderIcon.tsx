import { Match } from '@increaser/ui/base/Match'
import { FacebookIcon } from '@increaser/ui/icons/FacebookIcon'
import { GoogleIcon } from '@increaser/ui/icons/GoogleIcon'
import { OAuthProvider } from '@increaser/entities/OAuthProvider'

interface AuthProviderIconProps {
  provider: OAuthProvider
}

export const AuthProviderIcon = ({ provider }: AuthProviderIconProps) => (
  <Match
    value={provider}
    google={() => <GoogleIcon />}
    facebook={() => <FacebookIcon />}
  />
)
