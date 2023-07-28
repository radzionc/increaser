import { MembershipPeriod } from 'membership'

import { CheckoutContent } from './CheckoutContent'
import { PaddleModal } from './PaddleModal'

interface Props {
  period: MembershipPeriod
  onClose: () => void
}

export const CheckoutModal = ({ period, onClose }: Props) => {
  return (
    <PaddleModal
      onClose={onClose}
      renderContent={() => (
        <CheckoutContent onClose={onClose} period={period} />
      )}
    />
  )
}
