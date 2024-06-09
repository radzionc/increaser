import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'

import { IconCentricButton } from '@lib/ui/buttons/IconCentricButton'
import { getOAuthUrl } from '@increaser/app/auth/utils/oauth'
import { AuthProviderIcon } from './AuthProviderIcon'
import {
  OAuthProvider,
  oAuthProviderName,
} from '@increaser/entities/OAuthProvider'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'

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
        icon={<AuthProviderIcon provider={provider} />}
      />
    </ExternalLink>
  )
}
