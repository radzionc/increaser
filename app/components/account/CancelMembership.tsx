import { PaddleIFrame } from 'membership/components/PaddleIFrame'
import { PaddleModal } from 'membership/components/PaddleModal'
import { useCallback, useState } from 'react'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { useAssertUserState } from 'user/state/UserStateContext'

export const CancelMembership = () => {
  const [isPaddleOpen, setIsPaddleOpen] = useState(false)

  const onSuccess = useCallback(() => {
    setIsPaddleOpen(false)
  }, [])

  const { membership } = useAssertUserState()
  const subscription = membership?.subscription
  if (!subscription) return null
  const { cancelUrl } = subscription

  return (
    <>
      <Button
        kind="outlined"
        color="alert"
        onClick={() => setIsPaddleOpen(true)}
      >
        Cancel Subscription
      </Button>
      {isPaddleOpen && (
        <PaddleModal
          onClose={() => setIsPaddleOpen(false)}
          renderContent={() => (
            <PaddleIFrame
              override={cancelUrl}
              product={subscription.planId}
              onSuccess={onSuccess}
              onClose={() => setIsPaddleOpen(false)}
            />
          )}
        />
      )}
    </>
  )
}
