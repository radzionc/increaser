import { Button } from '@increaser/ui/ui/buttons/Button'
import { APP_URL } from 'product'
import { ExternalLink } from 'router/Link/ExternalLink'

interface Props {
  text?: string
}

export const CTA = ({ text = 'Start now' }: Props) => {
  return (
    <ExternalLink openInSameTab to={`${APP_URL}/sign-up`}>
      <Button as="div" kind="reversed" size="xl">
        {text}
      </Button>
    </ExternalLink>
  )
}
