import { analytics } from 'analytics'
import { useMembershipPricesQuery } from 'membership/hooks/useMembershipPricesQuery'
import { useEffect } from 'react'
import { useBoolean } from 'shared/hooks/useBoolean'

import { FreeTrialEnded } from './FreeTrialEnded'
import { MembershipContext } from './MembershipContext'
import { MembershipSuccessModal } from './MembershipSuccessModal'

interface Props {
  children: React.ReactNode
}

export const MembershipProvider = ({ children }: Props) => {
  useMembershipPricesQuery()
  const [
    isMembershipSuccessModalOpen,
    { set: openMembershipSuccessModal, unset: closeMembershipSuccessModal },
  ] = useBoolean(false)

  const [
    isFreeTrialEndedModalOpen,
    { set: openFreeTrialEndedModal, unset: closeFreeTrialEndedModal },
  ] = useBoolean(false)

  useEffect(() => {
    if (isFreeTrialEndedModalOpen) {
      analytics.trackEvent('Open free trial ended modal')
    }
  }, [isFreeTrialEndedModalOpen])

  return (
    <MembershipContext.Provider
      value={{
        isMembershipSuccessModalOpen,
        openMembershipSuccessModal,
        closeMembershipSuccessModal,

        isFreeTrialEndedModalOpen,
        openFreeTrialEndedModal,
        closeFreeTrialEndedModal,
      }}
    >
      {children}
      {isMembershipSuccessModalOpen && <MembershipSuccessModal />}
      {isFreeTrialEndedModalOpen && <FreeTrialEnded />}
    </MembershipContext.Provider>
  )
}
