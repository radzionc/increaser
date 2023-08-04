export const getYearlySubscriptionSavings = (
  yearlyPrice: number,
  monthlyPrice: number,
) => {
  const monthlyYearTotal = monthlyPrice * 12

  return (monthlyYearTotal - yearlyPrice) / monthlyYearTotal
}
