import { PaddleIFrame } from 'membership/components/PaddleIFrame'
import { PaddleModal } from 'membership/components/PaddleModal'
import { useState } from 'react'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { useAssertUserState } from 'user/state/UserStateContext'

export const UpdateMembership = () => {
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
