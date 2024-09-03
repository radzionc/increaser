import { SubscriptionPrice } from '@lib/subscription-ui/SubscriptionPrice'
import { useSubscriptionBillingCycle } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { SubscriptionPricesQueryDependant } from '@increaser/paddle-classic-ui/components/SubscriptionPricesQueryDependant'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { Switch } from '@lib/ui/inputs/Switch'
import styled, { useTheme } from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Tag } from '@lib/ui/tags/Tag'
import { getAnnualSubscriptionSavings } from '@increaser/entities-utils/subscription/getAnnualSubscriptionSavings'
import { toPercents } from '@lib/utils/toPercents'

const Header = styled(HStack)`
  padding: 0;
  position: relative;
  align-items: center;
  width: 100%;

  > * {
    padding: ${toSizeUnit(panelDefaultPadding)};
  }
`

const Savings = styled(Tag)`
  pointer-events: none;
  padding: 8px 12px;
  font-size: 16px;
  position: absolute;
  right: ${toSizeUnit(panelDefaultPadding)};
`

export const SubscriptionBillingCycleSelector = () => {
  const [billingCycle, setBillingCycle] = useSubscriptionBillingCycle()

  const { colors } = useTheme()

  return (
    <SubscriptionPricesQueryDependant
      success={(prices) => {
        const saving = getAnnualSubscriptionSavings(
          prices.year.amount,
          prices.month.amount,
        )
        const isSaving = billingCycle === 'year'
        return (
          <>
            <Header>
              <Switch
                style={{ width: '100%' }}
                value={isSaving}
                onChange={(value) => setBillingCycle(value ? 'year' : 'month')}
                label="Annual billing"
              />
              {isSaving && (
                <Savings $color={colors.success}>
                  save {toPercents(saving, 'round')}
                </Savings>
              )}
            </Header>
            <SubscriptionPrice
              currency={prices.year.currency}
              billingCycle={billingCycle}
              price={{
                month: prices.month.amount,
                year: prices.year.amount,
              }}
            />
          </>
        )
      }}
    />
  )
}
