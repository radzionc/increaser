import { formatDuration } from '@lib/utils/time/formatDuration'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { ComponentWithValueProps, NamedComponentProps } from '@lib/ui/props'

export const AverageValue = ({
  value,
  name,
}: NamedComponentProps & ComponentWithValueProps<number>) => {
  return (
    <span>
      <EmphasizeNumbers
        value={formatDuration(value, 's', {
          minUnit: 'min',
          maxUnit: 'h',
        })}
      />{' '}
      {name}
    </span>
  )
}
