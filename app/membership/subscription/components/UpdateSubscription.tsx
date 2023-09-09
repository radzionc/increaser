import { useState } from 'react'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { useAssertUserState } from 'user/state/UserStateContext'
import { PaddleIFrame } from '../../paddle/PaddleIFrame'
import { PaddleModal } from '../../paddle/PaddleModal'

export const UpdateSubscription = () => {
  const [isPaddleOpen, setIsPaddleOpen] = useState(false)

  const { membership } = useAssertUserState()
  const subscription = membership?.subscription
  if (!subscription) return null
  const { updateUrl, planId } = subscription

  return (
    <>
      <Button
        kind="outlined"
        color="secondary"
        onClick={() => setIsPaddleOpen(true)}
      >
        Update subscription
      </Button>
      {isPaddleOpen && (
        <PaddleModal
          onClose={() => setIsPaddleOpen(false)}
          renderContent={() => (
            <PaddleIFrame
              override={updateUrl}
              product={planId}
              onSuccess={() => setIsPaddleOpen(false)}
              onClose={() => setIsPaddleOpen(false)}
            />
          )}
        />
      )}
    </>
  )
}
