import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { InfoIcon } from '@lib/ui/icons/InfoIcon'
import { ValueProp } from '@lib/ui/props'
import { ProductTool } from '@product/entities/ProductTool'
import { getAppPath } from '@product/ui/navigation/app'
import Link from 'next/link'

export const LearnMoreShyAction = ({ value }: ValueProp<ProductTool>) => {
  return (
    <Link href={getAppPath('info', value)}>
      <Button as="div" kind="outlined" size="s">
        <HStack gap={8} alignItems="center">
          <InfoIcon />
          Learn more
        </HStack>
      </Button>
    </Link>
  )
}
