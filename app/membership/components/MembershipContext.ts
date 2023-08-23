import { createContext } from 'react'
import { createContextHook } from '@increaser/ui/state/createContextHook'

export interface MembershipState {
  isMembershipSuccessModalOpen: boolean
  openMembershipSuccessModal: () => void
  closeMembershipSuccessModal: () => void

  isFreeTrialEndedModalOpen: boolean
  openFreeTrialEndedModal: () => void
  closeFreeTrialEndedModal: () => void
}

export const MembershipContext = createContext<MembershipState | undefined>(
  undefined,
)

export const useMembership = createContextHook(
  MembershipContext,
  'MembershipContext',
)
