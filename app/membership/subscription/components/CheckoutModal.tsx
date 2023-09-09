import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'

import { CheckoutContent } from './CheckoutContent'
import { PaddleModal } from '../../paddle/PaddleModal'

interface Props {
  period: SubscriptionCadence
  onClose: () => void
}

export const CheckoutModal = ({ period, onClose }: Props) => {
  return (
    <PaddleModal
      title="Increaser subscription"
      onClose={onClose}
      renderContent={() => (
        <CheckoutContent onClose={onClose} period={period} />
      )}
    />
  )
}
