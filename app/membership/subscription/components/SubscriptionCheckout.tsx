import { ClosableComponentProps } from '@increaser/ui/props'
import { useSubscriptionBillingCycle } from '@increaser/ui/subscription/components/SubscriptionBillingCycleProvider'
import { productName } from '@increaser/entities'
import { ManageSubscriptionProvider } from './ManageSubscriptionProvider'
import { PaddleModal } from '@increaser/paddle-ui/components/PaddleModal'
import { PaddleIFrame } from '@increaser/paddle-ui/components/PaddleIFrame'
import { paddleProductCode } from '@increaser/paddle-ui/paddleProductCode'

export const SubscriptionCheckout = ({ onClose }: ClosableComponentProps) => {
  const [billingCycle] = useSubscriptionBillingCycle()
  return (
    <ManageSubscriptionProvider>
      <PaddleModal title={`${productName} subscription`} onClose={onClose}>
        <PaddleIFrame
          onClose={onClose}
          product={paddleProductCode[billingCycle]}
        />
      </PaddleModal>
    </ManageSubscriptionProvider>
  )
}
