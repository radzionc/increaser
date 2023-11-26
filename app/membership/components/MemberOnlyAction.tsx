import { Opener } from '@increaser/ui/base/Opener'
import { useIsLikeMember } from 'membership/hooks/useIsLikeMember'
import { SubscriptionPrompt } from 'membership/subscription/components/SubscriptionPrompt'

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

  if (isLikeMember) {
    return render({ action })
  }

  return (
    <Opener
      renderOpener={({ onOpen }) => render({ action: onOpen })}
      renderContent={({ onClose }) => <SubscriptionPrompt onClose={onClose} />}
    />
  )
}
