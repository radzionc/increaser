import { MembershipPeriod } from 'membership'
import { useMembershipPricesQuery } from 'membership/hooks/useMembershipPricesQuery'
import { useState } from 'react'
import { capitalizeFirstLetter } from 'shared/utils/capitalizeFirstLetter'
import styled from 'styled-components'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { SelectOption } from '@increaser/ui/ui/inputs/Select/SelectOption'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
interface Props {
  onPurchaseRequest: (period: MembershipPeriod) => void
}

const SaveBadge = styled(Text)`
  padding: 4px 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.success.toCssValue()};
  color: ${({ theme }) =>
    theme.colors.success.getVariant({ l: (l) => l * 0.2 }).toCssValue()};
`

const montsInPeriod = {
  monthly: 1,
  yearly: 12,
}

export const MembershipSaleCard = ({ onPurchaseRequest }: Props) => {
  const { data: prices } = useMembershipPricesQuery()
  const [period, setPeriod] = useState<MembershipPeriod>('yearly')

  if (!prices) return null

  const monthlyYearTotal = prices.monthly.amount * 12
  const yearlySave = Math.round(
    ((monthlyYearTotal - prices.yearly.amount) / monthlyYearTotal) * 100,
  )

  const price = period === 'yearly' ? prices.yearly : prices.monthly

  return (
    <VStack style={{ minWidth: 320 }} alignItems="start" gap={20}>
      <SameWidthChildrenRow fullWidth gap={8}>
        {['monthly', 'yearly'].map((option) => {
          const optionText = capitalizeFirstLetter(option)

          return (
            <SelectOption
              isSelected={option === period}
              value={option}
              onSelect={() => setPeriod(option as MembershipPeriod)}
              groupName="membership-plan"
              key={option}
            >
              {option === 'monthly' ? (
                optionText
              ) : (
                <HStack alignItems="center" gap={8}>
                  <Text>{optionText}</Text>
                  <SaveBadge weight="semibold">save {yearlySave}%</SaveBadge>
                </HStack>
              )}
            </SelectOption>
          )
        })}
      </SameWidthChildrenRow>
      <VStack fullWidth alignItems="center">
        <HStack alignItems="center" gap={4}>
          <HStack alignItems="center" gap={4}>
            <Text color="regular">{price.currency}</Text>
            <Text
              color="regular"
              style={{ textAlign: 'center' }}
              size={26}
              weight="bold"
            >
              {price.amount &&
                (price.amount / montsInPeriod[period]).toFixed(2)}
            </Text>
          </HStack>
          <Text color="supporting">/ mo</Text>
        </HStack>
        <Text
          size={14}
          color="supporting"
          style={{
            transition: 'none',
            visibility: period === 'monthly' ? 'hidden' : 'initial',
          }}
        >
          * {price.currency} {price.amount} per year
        </Text>
      </VStack>
      <Button
        kind="reversed"
        size="xl"
        style={{ width: '100%' }}
        onClick={() => onPurchaseRequest(period)}
      >
        Purchase
      </Button>
    </VStack>
  )
}
