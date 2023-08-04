import { useTheme } from 'styled-components'
import { InputProps } from '../../shared/props'
import { toPercents } from '../../shared/utils/toPercents'
import { SubscriptionCadence } from '../SubscriptionCadence'
import { HStack } from '../../ui/Stack'
import { Switch } from '../../ui/Switch/Switch'
import { Tag } from '../../ui/Tag'

interface SubscriptionCadenceInputProps
  extends InputProps<SubscriptionCadence> {
  saving: number
}

export const SubscriptionCadenceInput = ({
  value,
  onChange,
  saving,
}: SubscriptionCadenceInputProps) => {
  const { colors } = useTheme()
  return (
    <HStack alignItems="center" gap={8}>
      <Switch
        kind="primary"
        value={value === 'year'}
        onChange={(value) => onChange(value ? 'year' : 'month')}
        label="Annual billing"
      />
      <Tag $color={colors.success}>save {toPercents(saving, 'round')}</Tag>
    </HStack>
  )
}
