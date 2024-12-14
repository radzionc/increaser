import { useIsLikeMember } from '@increaser/app/membership/hooks/useIsLikeMember'
import { useRouter } from 'next/router'
import { getAppPath } from '@increaser/ui/navigation/app'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { ReactNode } from 'react'

type Action = () => void

interface RenderProps {
  action: Action
}

interface MemberOnlyActionProps {
  action: () => void
  render: (props: RenderProps) => ReactNode
}

export const MemberOnlyAction = ({ action, render }: MemberOnlyActionProps) => {
  const isLikeMember = useIsLikeMember()

  const { push } = useRouter()

  const analytics = useAnalytics()

  if (isLikeMember) {
    return render({ action })
  }

  return (
    <>
      {render({
        action: () => {
          push(getAppPath('membership'))
          analytics.trackEvent('Action requires membership')
        },
      })}
    </>
  )
}
