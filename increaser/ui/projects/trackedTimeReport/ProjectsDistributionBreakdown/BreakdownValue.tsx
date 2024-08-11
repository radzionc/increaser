import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'

export const BreakdownValue = ({ value }: ComponentWithValueProps<string>) => (
  <Text weight="600">
    <EmphasizeNumbers value={value} />
  </Text>
)
