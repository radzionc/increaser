import { useIsLikeMember } from '@increaser/app/membership/hooks/useIsLikeMember'
import { SubscriptionPrompt } from '@increaser/app/membership/subscription/components/SubscriptionPrompt'
import { useState } from 'react'
import { analytics } from '../../analytics'

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

  const [isOpen, setIsOpen] = useState(false)

  if (isLikeMember) {
    return render({ action })
  }

  return (
    <>
      {render({
        action: () => {
          setIsOpen(true)
          analytics.trackEvent('Action requires membership')
        },
      })}
      {isOpen && <SubscriptionPrompt onClose={() => setIsOpen(false)} />}
    </>
  )
}
