import { useIsLikeMember } from '@increaser/app/membership/hooks/useIsLikeMember'
import { useRouter } from 'next/router'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'

type Action = () => void

interface RenderProps {
  action: Action
}

interface MemberOnlyActionProps {
  action: () => void
  render: (props: RenderProps) => JSX.Element
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
          push(AppPath.Membership)
          analytics.trackEvent('Action requires membership')
        },
      })}
    </>
  )
}
