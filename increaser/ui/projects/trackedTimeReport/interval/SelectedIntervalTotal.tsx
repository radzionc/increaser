import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { useSelectedIntervalActiveTimeSeries } from '../chart/useSelectedIntervalActiveTimeSeries'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'

export const SelectedIntervalTotal = () => {
  const timeSeries = useSelectedIntervalActiveTimeSeries()

  const value = formatDuration(sum(Object.values(timeSeries).flat()), 's', {
    minUnit: 'min',
    maxUnit: 'h',
  })

  return <EmphasizeNumbers value={value} />
}
