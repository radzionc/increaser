import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { sum } from '@lib/utils/array/sum'
import { formatDuration } from '@lib/utils/time/formatDuration'

import { useSelectedIntervalActiveTimeSeries } from '../chart/useSelectedIntervalActiveTimeSeries'

export const SelectedIntervalTotal = () => {
  const timeSeries = useSelectedIntervalActiveTimeSeries()

  const value = formatDuration(sum(Object.values(timeSeries).flat()), 's', {
    minUnit: 'min',
    maxUnit: 'h',
  })

  return <EmphasizeNumbers value={value} />
}
