import { CheckoutContent } from './CheckoutContent'
import { PaddleModal } from '../../paddle/PaddleModal'
import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'
import { ClosableComponentProps } from '@increaser/ui/props'

interface CheckoutModalProps extends ClosableComponentProps {
  billingCycle: SubscriptionBillingCycle
}

export const CheckoutModal = ({
  billingCycle,
  onClose,
}: CheckoutModalProps) => {
  return (
    <PaddleModal title="Increaser subscription" onClose={onClose}>
      <CheckoutContent onClose={onClose} billingCycle={billingCycle} />
    </PaddleModal>
  )
}
