import { ReactNode } from 'react'
import { HStack } from '../../ui/Stack'
import { CheckCircleIcon } from '../../ui/icons/CheckCircleIcon'
import { Text } from '../../ui/Text'

interface SubscriptionBenefitProps {
  benefit: ReactNode
}

export const SubscriptionBenefit = ({ benefit }: SubscriptionBenefitProps) => {
  return (
    <HStack alignItems="center" gap={8}>
      <Text style={{ display: 'flex' }} color="success">
        <CheckCircleIcon />
      </Text>
      <Text>{benefit}</Text>
    </HStack>
  )
}
