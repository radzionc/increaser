import { ExternalLink } from 'router/Link/ExternalLink'
import { Path } from 'router/Path'
import { APP_NAME } from 'shared/product'
import { Text } from '@increaser/ui/ui/Text'
import { LinkText } from '@increaser/ui/ui/Text/LinkText'

export const SignUpAgreement = () => {
  return (
    <Text size={14} color="shy">
      By continuing, you agree to {APP_NAME}’s
      <br />
      <LinkText as="span">
        <ExternalLink to={Path.TermsOfService}>Terms of Service</ExternalLink>
      </LinkText>{' '}
      and{' '}
      <LinkText as="span">
        <ExternalLink to={Path.PrivacyPolicy}>Privacy Policy</ExternalLink>
      </LinkText>
    </Text>
  )
}
