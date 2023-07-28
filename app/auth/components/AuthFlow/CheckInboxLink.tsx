import { useMemo } from 'react'
import { ExternalLink } from 'router/Link/ExternalLink'
import { TextButton } from '@increaser/ui/ui/buttons/TextButton'

interface Props {
  email: string
}

export const CheckInboxLink = ({ email }: Props) => {
  const url = useMemo(() => {
    if (email.includes('@gmail')) {
      const searchStr = encodeURIComponent(`from:@increaser+in:anywhere`)
      return ['https://mail.google.com/mail/u/0/#search', searchStr].join('/')
    }
    if (
      email.includes('@outlook') ||
      email.includes('@hotmail') ||
      email.includes('@live')
    ) {
      return 'https://outlook.live.com/mail/0/inbox'
    }
  }, [email])

  if (!url) {
    return null
  }

  return (
    <ExternalLink to={url}>
      <TextButton as="div" text="Check your inbox" />
    </ExternalLink>
  )
}
