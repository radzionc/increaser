import { useMemo } from 'react'
import { ExternalLink } from 'router/Link/ExternalLink'
import { Button } from '@increaser/ui/ui/buttons/Button'

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
    <ExternalLink style={{ width: '100%' }} to={url}>
      <Button size="xl" as="div">
        Check your inbox
      </Button>
    </ExternalLink>
  )
}
