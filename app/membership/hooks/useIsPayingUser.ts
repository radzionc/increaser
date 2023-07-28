import { useAssertUserState } from 'user/state/UserStateContext'

export const useIsPayingUser = () => {
  const { membership } = useAssertUserState()

  if (!membership) return false

  const { subscription } = membership
  if (!subscription) return true

  const { nextBillDate, cancellationEffectiveDate } = subscription

  if (cancellationEffectiveDate) {
    const [year, month, day] = cancellationEffectiveDate.split('-').map(Number)
    const shouldBeCancelledAt = new Date(year, month - 1, day).getTime()
    return shouldBeCancelledAt > Date.now()
  }

  return !!nextBillDate
}
