import { Button } from '../buttons/Button'
import { HStack } from '../css/stack'
import { InfoIcon } from '../icons/InfoIcon'
import { ValueProp } from '../props'
import { ProductTool } from '@increaser/entities/ProductTool'
import Link from 'next/link'
import { getAppPath } from '@increaser/ui/navigation/app'

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
