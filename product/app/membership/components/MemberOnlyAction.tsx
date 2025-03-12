import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { useIsLikeMember } from '@product/app/membership/hooks/useIsLikeMember'
import { getAppPath } from '@product/ui/navigation/app'
import { useRouter } from 'next/router'
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
