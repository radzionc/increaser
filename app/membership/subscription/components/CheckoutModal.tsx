import { CheckoutContent } from './CheckoutContent'
import { PaddleModal } from '../../paddle/PaddleModal'
import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'

interface Props {
  billingCycle: SubscriptionBillingCycle
  onClose: () => void
}

export const CheckoutModal = ({ billingCycle, onClose }: Props) => {
  return (
    <PaddleModal
      title="Increaser subscription"
      onClose={onClose}
      renderContent={() => (
        <CheckoutContent onClose={onClose} billingCycle={billingCycle} />
      )}
    />
  )
}
