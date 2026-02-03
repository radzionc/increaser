import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { IconCentricButton } from '@lib/ui/buttons/IconCentricButton'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { getOAuthUrl } from '@product/app/auth/utils/oauth'
import {
  OAuthProvider,
  oAuthProviderName,
} from '@product/entities/OAuthProvider'

import { AuthProviderIcon } from './AuthProviderIcon'

interface OAuthOptionProps {
  provider: OAuthProvider
}

export const OAuthOption = ({ provider }: OAuthOptionProps) => {
  const providerName = oAuthProviderName[provider]

  const analytics = useAnalytics()

  return (
    <ExternalLink
      key={provider}
      to={getOAuthUrl(provider)}
      openInSameTab
      onClick={() => {
        analytics.trackEvent(`Start identification with ${providerName}`)
      }}
    >
      <IconCentricButton
        as="div"
        text={`Continue with ${providerName}`}
        icon={<AuthProviderIcon />}
      />
    </ExternalLink>
  )
}
