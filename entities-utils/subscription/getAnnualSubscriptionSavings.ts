import { MONTHS_IN_YEAR } from '@increaser/utils/time'

export const getAnnualSubscriptionSavings = (
  annualPrice: number,
  monthlyPrice: number,
) => {
  const monthlyYearTotal = monthlyPrice * MONTHS_IN_YEAR

  return (monthlyYearTotal - annualPrice) / monthlyYearTotal
}
